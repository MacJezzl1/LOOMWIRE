"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Archive,
  BookOpen,
  Brain,
  ChevronRight,
  Copy,
  Download,
  GalleryVerticalEnd,
  KeyRound,
  Package,
  Rocket,
  ShieldCheck,
  Sparkles,
  TriangleAlert
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BrandBrief,
  BrandSystem,
  Provider,
  generateLocalBrandSystem
} from "@/lib/loomwire";

const defaultBrief: BrandBrief = {
  idea: "A luxury streetwear brand inspired by African futurism and AI culture.",
  industry: "fashion, AI culture, creator tools",
  audience: "young founders, artists, designers, musicians, and culture builders",
  style: "luxury tech, street-art archive, black gallery, warm yellow, acid green",
  target: "global with African cultural intelligence",
  productType: "hoodie, AI tool, digital community pass, and launch website",
  mood: "intelligent, rebellious, cinematic, protective",
  priceLevel: "premium but reachable",
  vision: "to become a protected cultural system for unknown creators with big ideas"
};

const providers: {
  id: Provider;
  label: string;
  note: string;
  needsKey: boolean;
  model: string;
}[] = [
  {
    id: "demo",
    label: "Demo Engine",
    note: "Free local rules",
    needsKey: false,
    model: ""
  },
  {
    id: "openai",
    label: "OpenAI",
    note: "BYO key",
    needsKey: true,
    model: "gpt-4.1-mini"
  },
  {
    id: "anthropic",
    label: "Claude",
    note: "BYO key",
    needsKey: true,
    model: "claude-3-5-haiku-latest"
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    note: "BYO/free tiers",
    needsKey: true,
    model: "openai/gpt-4o-mini"
  },
  {
    id: "groq",
    label: "Groq",
    note: "Fast/free tiers",
    needsKey: true,
    model: "llama-3.1-8b-instant"
  },
  {
    id: "ollama",
    label: "Ollama",
    note: "Local model",
    needsKey: false,
    model: "llama3.1"
  }
];

const inputClass = "field px-3 py-2.5 text-sm";

function Field({
  label,
  value,
  onChange,
  textarea = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
        {label}
      </span>
      {textarea ? (
        <textarea
          className={`${inputClass} min-h-[92px] resize-y`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className={inputClass}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function Section({
  icon: Icon,
  title,
  children
}: {
  icon: typeof Sparkles;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="paper-panel p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-wire">
        <Icon size={18} />
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-paper">
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}

function downloadJson(system: BrandSystem) {
  const blob = new Blob([JSON.stringify(system, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${system.nameOptions[0]?.name || "loomwire"}-brand-system.json`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  anchor.click();
  URL.revokeObjectURL(url);
}

export function BrandSystemGenerator() {
  const [brief, setBrief] = useState<BrandBrief>(defaultBrief);
  const [provider, setProvider] = useState<Provider>("demo");
  const [apiKey, setApiKey] = useState("");
  const [rememberKey, setRememberKey] = useState(false);
  const [model, setModel] = useState("");
  const [system, setSystem] = useState<BrandSystem>(() =>
    generateLocalBrandSystem(defaultBrief)
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Demo engine ready.");

  const selectedProvider = useMemo(
    () => providers.find((item) => item.id === provider) || providers[0],
    [provider]
  );

  useEffect(() => {
    const nextProvider = providers.find((item) => item.id === provider);
    setModel(nextProvider?.model || "");
    const stored = window.localStorage.getItem(`loomwire-key-${provider}`);
    setApiKey(stored || "");
    setRememberKey(Boolean(stored));
  }, [provider]);

  function update<K extends keyof BrandBrief>(key: K, value: BrandBrief[K]) {
    setBrief((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("Agents are building the brand system.");

    if (rememberKey && apiKey && selectedProvider.needsKey) {
      window.localStorage.setItem(`loomwire-key-${provider}`, apiKey);
    }

    if (!rememberKey) {
      window.localStorage.removeItem(`loomwire-key-${provider}`);
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brief,
          provider,
          apiKey: selectedProvider.needsKey ? apiKey : undefined,
          model
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed.");
      }

      setSystem(data.system);
      setMessage(
        data.fallback
          ? `Provider fell back to the free demo engine: ${data.providerError}`
          : `Generated with ${selectedProvider.label}.`
      );
    } catch (error) {
      setSystem(generateLocalBrandSystem(brief));
      setMessage(
        error instanceof Error
          ? `Using demo engine after error: ${error.message}`
          : "Using demo engine after an unknown error."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="generator" className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={submit} className="paper-panel acid-edge p-4 sm:p-5">
        <div className="mb-5 flex flex-col gap-3 border-b border-paper/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
              Atelier Console
            </p>
            <h2 className="editorial-heading mt-2 text-3xl text-paper sm:text-4xl">
              Build my first brand system
            </h2>
          </div>
          <div className="rounded-md border border-wire/40 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-wire">
            MVP 001
          </div>
        </div>

        <div className="grid gap-4">
          <Field
            label="Brand idea"
            value={brief.idea}
            textarea
            onChange={(value) => update("idea", value)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Industry"
              value={brief.industry}
              onChange={(value) => update("industry", value)}
            />
            <Field
              label="Audience"
              value={brief.audience}
              onChange={(value) => update("audience", value)}
            />
            <Field
              label="Style"
              value={brief.style}
              onChange={(value) => update("style", value)}
            />
            <Field
              label="Country/global target"
              value={brief.target}
              onChange={(value) => update("target", value)}
            />
            <Field
              label="Product blank"
              value={brief.productType}
              onChange={(value) => update("productType", value)}
            />
            <Field
              label="Mood"
              value={brief.mood}
              onChange={(value) => update("mood", value)}
            />
            <Field
              label="Price level"
              value={brief.priceLevel}
              onChange={(value) => update("priceLevel", value)}
            />
            <Field
              label="Long-term vision"
              value={brief.vision}
              onChange={(value) => update("vision", value)}
            />
          </div>
        </div>

        <div className="my-5 border-t border-paper/10 pt-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-paper">
            <KeyRound size={16} className="text-wire" />
            AI lane
          </div>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {providers.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setProvider(item.id)}
                className={`min-h-[64px] rounded-md border px-3 py-2 text-left transition ${
                  provider === item.id
                    ? "border-volt bg-volt/14 text-paper"
                    : "border-paper/12 bg-paper/[0.04] text-bone hover:border-wire/70"
                }`}
              >
                <span className="block text-sm font-black">{item.label}</span>
                <span className="mt-1 block text-xs text-bone/70">{item.note}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_0.8fr]">
            <label className="block min-w-0">
              <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                {selectedProvider.needsKey ? "User API key" : "Provider status"}
              </span>
              <input
                type={selectedProvider.needsKey ? "password" : "text"}
                disabled={!selectedProvider.needsKey}
                className={inputClass}
                value={selectedProvider.needsKey ? apiKey : selectedProvider.note}
                onChange={(event) => setApiKey(event.target.value)}
              />
            </label>
            <label className="block min-w-0">
              <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                Model
              </span>
              <input
                className={inputClass}
                value={model}
                placeholder={selectedProvider.model || "provider default"}
                onChange={(event) => setModel(event.target.value)}
              />
            </label>
          </div>

          {selectedProvider.needsKey ? (
            <label className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-bone/75">
              <input
                type="checkbox"
                checked={rememberKey}
                onChange={(event) => setRememberKey(event.target.checked)}
                className="mt-1 accent-[#b7ff4a]"
              />
              Remember this key in this browser only. Leave unchecked for session-only use.
            </label>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="btn btn-primary flex-1" disabled={loading} type="submit">
            <Sparkles size={18} />
            {loading ? "Building system" : "Generate brand system"}
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(system, null, 2));
              setMessage("Copied brand system JSON.");
            }}
          >
            <Copy size={18} />
            Copy
          </button>
        </div>

        <p className="mt-3 min-h-[36px] text-sm leading-relaxed text-bone/80">
          {message}
        </p>
      </form>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="min-w-0"
      >
        <div className="paper-panel p-4 sm:p-5">
          <div className="mb-5 flex flex-col gap-4 border-b border-paper/10 pb-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-wire">
                Lookbook Sheet
              </p>
              <h2 className="editorial-heading mt-2 text-3xl text-paper sm:text-5xl">
                {system.nameOptions[0]?.name}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-bone">
                {system.nameOptions[0]?.meaning}
              </p>
            </div>
            <div
              className="score-ring grid h-28 w-28 shrink-0 place-items-center rounded-full"
              style={
                {
                  "--score": system.dnaScore.total
                } as React.CSSProperties
              }
              aria-label={`Brand DNA score ${system.dnaScore.total}`}
            >
              <div className="text-center">
                <div className="text-3xl font-black text-volt">
                  {system.dnaScore.total}
                </div>
                <div className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-bone">
                  DNA
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <Section icon={Brain} title="The Name Room">
              <div className="grid gap-3">
                {system.nameOptions.map((item) => (
                  <article
                    key={item.name}
                    className="rounded-md border border-paper/10 bg-paper/[0.035] p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-black text-paper">{item.name}</h4>
                      <ChevronRight size={17} className="mt-1 text-volt" />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-bone">
                      {item.slogan}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-bone/70">
                      {item.risk}
                    </p>
                  </article>
                ))}
              </div>
            </Section>

            <Section icon={ShieldCheck} title="The IP Room">
              <ul className="space-y-2 text-sm leading-relaxed text-bone">
                {system.ipChecklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-volt" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section icon={GalleryVerticalEnd} title="The Studio">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {system.palette.map((swatch) => (
                  <div key={swatch.hex} className="rounded-md border border-paper/10 p-2">
                    <div
                      className="h-12 rounded"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <div className="mt-2 text-xs font-black text-paper">
                      {swatch.name}
                    </div>
                    <div className="mt-1 text-[0.68rem] leading-snug text-bone/70">
                      {swatch.usage}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-md border border-wire/20 bg-wire/10 p-3 text-xs leading-relaxed text-bone">
                {system.logoPrompt}
              </p>
            </Section>

            <Section icon={Package} title="The Blank Room">
              <h4 className="text-lg font-black text-paper">{system.productDrop.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-bone">
                Blank: {system.productDrop.blank}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-bone/80">
                {system.productDrop.priceLogic}
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-bone">
                {system.productDrop.details.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-wire" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section icon={BookOpen} title="Lookbook Engine">
              <ol className="space-y-2 text-sm leading-relaxed text-bone">
                {system.lookbookOutline.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-black text-volt">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </Section>

            <Section icon={Rocket} title="The Drop Room">
              <ul className="space-y-2 text-sm leading-relaxed text-bone">
                {system.launchPlan.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
            <Section icon={Archive} title="Creator Proof Vault">
              <ul className="space-y-2 text-sm leading-relaxed text-bone">
                {system.evidencePack.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-volt" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section icon={TriangleAlert} title="AI Brand Critic">
              <p className="text-sm leading-relaxed text-bone">
                {system.agentNotes.redTeam}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {system.culturalMap.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-paper/15 bg-paper/[0.045] px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-bone"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-paper/10 pt-5 sm:flex-row">
            <button
              type="button"
              onClick={() => downloadJson(system)}
              className="btn btn-primary"
            >
              <Download size={18} />
              Export evidence JSON
            </button>
            <div className="rounded-md border border-paper/10 bg-paper/[0.035] p-3 text-sm leading-relaxed text-bone">
              Social bio: {system.socialBio}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
