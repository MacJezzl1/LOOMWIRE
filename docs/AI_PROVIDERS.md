# AI Providers

LOOMWIRE has two kinds of AI lanes.

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
is stored in browser localStorage on their own machine.

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
- The app treats IP output as preparation, not legal advice.
- For real trademark work, use a qualified IP professional.
