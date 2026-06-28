import {
  BrandBrief,
  Provider,
  buildAiPrompt,
  coerceBrandSystem,
  generateLocalBrandSystem
} from "@/lib/loomwire";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const supportedProviders: Provider[] = [
  "demo",
  "openai",
  "anthropic",
  "openrouter",
  "groq",
  "ollama"
];

const AI_TIMEOUT_MS = 45000;

type GenerateRequest = {
  brief: BrandBrief;
  provider: Provider;
  apiKey?: string;
  model?: string;
};

function extractJson(text: string) {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) {
    return JSON.parse(trimmed);
  }

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return JSON.parse(fenced[1]);
  }

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) {
    return JSON.parse(trimmed.slice(start, end + 1));
  }

  throw new Error("AI response did not include JSON.");
}

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = AI_TIMEOUT_MS
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("AI provider request timed out.");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function callOpenAi(prompt: string, apiKey: string, model?: string) {
  const response = await fetchWithTimeout("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You create premium, practical brand systems and return strict JSON."
        },
        { role: "user", content: prompt }
      ],
      max_output_tokens: 2800,
      temperature: 0.85
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with ${response.status}.`);
  }

  const data = await response.json();
  return (
    data.output_text ||
    data.output?.flatMap((item: { content?: { text?: string }[] }) =>
      item.content?.map((content) => content.text).filter(Boolean)
    )?.join("\n") ||
    ""
  );
}

async function callAnthropic(prompt: string, apiKey: string, model?: string) {
  const response = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model || "claude-3-5-haiku-latest",
      max_tokens: 2400,
      temperature: 0.85,
      system: "You create premium, practical brand systems and return strict JSON.",
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic request failed with ${response.status}.`);
  }

  const data = await response.json();
  return (
    data.content
      ?.map((part: { text?: string }) => part.text)
      .filter(Boolean)
      .join("\n") || ""
  );
}

async function callOpenAiCompatible(
  endpoint: string,
  prompt: string,
  apiKey: string,
  model: string
) {
  const response = await fetchWithTimeout(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://github.com/MacJezzl1/LOOMWIRE",
      "X-Title": "LOOMWIRE"
    },
    body: JSON.stringify({
      model,
      temperature: 0.85,
      messages: [
        {
          role: "system",
          content:
            "You create premium, practical brand systems and return strict JSON."
        },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Compatible AI request failed with ${response.status}.`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

async function callOllama(prompt: string, model?: string) {
  const response = await fetchWithTimeout("http://127.0.0.1:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: model || "llama3.1",
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "You create premium, practical brand systems and return strict JSON."
        },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed with ${response.status}.`);
  }

  const data = await response.json();
  return data.message?.content || "";
}

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateRequest;
  const brief = body.brief;
  const provider = supportedProviders.includes(body.provider) ? body.provider : "demo";

  if (!brief) {
    return Response.json({ error: "Missing brief." }, { status: 400 });
  }

  if (provider === "demo") {
    return Response.json({
      system: generateLocalBrandSystem(brief),
      provider: "demo",
      fallback: false
    });
  }

  const prompt = buildAiPrompt(brief);
  const apiKey =
    body.apiKey ||
    (provider === "openai" ? process.env.OPENAI_API_KEY : undefined) ||
    (provider === "anthropic" ? process.env.ANTHROPIC_API_KEY : undefined) ||
    (provider === "openrouter" ? process.env.OPENROUTER_API_KEY : undefined) ||
    (provider === "groq" ? process.env.GROQ_API_KEY : undefined);

  try {
    let text = "";

    if (provider === "openai") {
      if (!apiKey) throw new Error("OpenAI API key is required.");
      text = await callOpenAi(prompt, apiKey, body.model);
    }

    if (provider === "anthropic") {
      if (!apiKey) throw new Error("Anthropic API key is required.");
      text = await callAnthropic(prompt, apiKey, body.model);
    }

    if (provider === "openrouter") {
      if (!apiKey) throw new Error("OpenRouter API key is required.");
      text = await callOpenAiCompatible(
        "https://openrouter.ai/api/v1/chat/completions",
        prompt,
        apiKey,
        body.model || "openai/gpt-4o-mini"
      );
    }

    if (provider === "groq") {
      if (!apiKey) throw new Error("Groq API key is required.");
      text = await callOpenAiCompatible(
        "https://api.groq.com/openai/v1/chat/completions",
        prompt,
        apiKey,
        body.model || "llama-3.1-8b-instant"
      );
    }

    if (provider === "ollama") {
      text = await callOllama(prompt, body.model);
    }

    const parsed = extractJson(text);
    return Response.json({
      system: { ...coerceBrandSystem(parsed, brief), source: provider },
      provider,
      fallback: false
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown AI error.";

    return Response.json({
      system: generateLocalBrandSystem(brief),
      provider,
      fallback: true,
      providerError: message
    });
  }
}
