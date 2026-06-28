import type { Provider } from "@/lib/loomwire";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ProviderStatus = {
  id: Provider;
  label: string;
  serverKeyReady: boolean;
  keyMode: "free" | "server-or-byo" | "local";
  defaultModel: string;
};

const statuses: ProviderStatus[] = [
  {
    id: "demo",
    label: "Demo Engine",
    serverKeyReady: true,
    keyMode: "free",
    defaultModel: ""
  },
  {
    id: "openai",
    label: "OpenAI",
    serverKeyReady: Boolean(process.env.OPENAI_API_KEY),
    keyMode: "server-or-byo",
    defaultModel: "gpt-4.1-mini"
  },
  {
    id: "anthropic",
    label: "Claude",
    serverKeyReady: Boolean(process.env.ANTHROPIC_API_KEY),
    keyMode: "server-or-byo",
    defaultModel: "claude-3-5-haiku-latest"
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    serverKeyReady: Boolean(process.env.OPENROUTER_API_KEY),
    keyMode: "server-or-byo",
    defaultModel: "openai/gpt-4o-mini"
  },
  {
    id: "groq",
    label: "Groq",
    serverKeyReady: Boolean(process.env.GROQ_API_KEY),
    keyMode: "server-or-byo",
    defaultModel: "llama-3.1-8b-instant"
  },
  {
    id: "ollama",
    label: "Ollama",
    serverKeyReady: false,
    keyMode: "local",
    defaultModel: "llama3.1"
  }
];

export async function GET() {
  return Response.json({
    providers: statuses,
    note:
      "LOOMWIRE never exposes server keys. Paid providers can use server env keys or a user's own browser-submitted key."
  });
}
