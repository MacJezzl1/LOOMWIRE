# AI Providers

LOOMWIRE has two kinds of AI lanes.

The UI calls `/api/providers` first. That endpoint reports whether each hosted
provider has a server-side key configured, without exposing the key value.

## Free / No-Key Lanes

**Demo Engine**

The built-in demo engine runs deterministic brand-system logic inside the app.
It is useful for demos, public GitHub review, and users who do not have paid API
keys yet.

**Ollama**

The Ollama lane calls a local model at:

```text
http://127.0.0.1:11434/api/chat
```

Use a model name such as:

```text
llama3.1
```

## Bring-Your-Own-Key Lanes

Users can paste their own key in the UI for one request. If they opt in, the key
is stored in browser localStorage on their own machine. If a deployment owner
sets server-side keys, users can leave the key field empty and use the hosted
provider lane.

Supported lanes:

- OpenAI: `https://api.openai.com/v1/responses`
- Claude: `https://api.anthropic.com/v1/messages`
- OpenRouter: `https://openrouter.ai/api/v1/chat/completions`
- Groq: `https://api.groq.com/openai/v1/chat/completions`

Optional server-side environment variables for self-hosted deployments:

```bash
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
OPENROUTER_API_KEY=
GROQ_API_KEY=
```

## Privacy Notes

- Do not commit `.env` files.
- Do not paste full API keys into issues, pull requests, screenshots, or chat.
- Provider requests time out and fall back to the demo engine so the app keeps
  working even when a paid provider is unavailable.
- The app treats IP output as preparation, not legal advice.
- For real trademark work, use a qualified IP professional.
