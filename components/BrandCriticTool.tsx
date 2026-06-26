"use client";

import { useMemo, useState } from "react";
import { Copy, Flame, Gauge, RotateCcw, TriangleAlert } from "lucide-react";
import { SaveToVaultButton } from "@/components/SaveToVaultButton";

function clamp(value: number) {
  return Math.max(18, Math.min(96, value));
}

function words(value: string) {
  return value.trim().split(/\s+/).filter(Boolean);
}

export function BrandCriticTool() {
  const [name, setName] = useState("LOOMWIRE");
  const [audience, setAudience] = useState("unknown creators, artists, founders, designers");
  const [product, setProduct] = useState("AI brand operating system with proof vault and lookbook engine");
  const [copy, setCopy] = useState(
    "Turn an idea into a protected cultural system."
  );
  const [copied, setCopied] = useState(false);

  const critique = useMemo(() => {
    const nameWords = words(name);
    const audienceWords = words(audience);
    const productWords = words(product);
    const copyWords = words(copy);
    const genericWords = ["brand", "creative", "studio", "agency", "digital", "solutions"];

    const nameScore = clamp(
      54 +
        (name.length > 5 ? 10 : -8) +
        (nameWords.length <= 2 ? 10 : -6) -
        genericWords.filter((word) => name.toLowerCase().includes(word)).length * 7
    );
    const audienceScore = clamp(42 + Math.min(32, audienceWords.length * 4));
    const productScore = clamp(46 + Math.min(34, productWords.length * 3));
    const copyScore = clamp(
      50 +
        (copyWords.length >= 6 ? 12 : -8) +
        (copy.includes(".") ? 6 : 0) +
        (copy.toLowerCase().includes("protected") ? 8 : 0)
    );
    const total = Math.round((nameScore + audienceScore + productScore + copyScore) / 4);

    const warnings = [
      nameWords.length > 3
        ? "The name may be too long to become a strong cultural stamp."
        : "The name is compact enough to behave like a mark.",
      audienceWords.length < 4
        ? "The audience is too vague. The brand needs a more visible tribe."
        : "The audience has enough shape to guide tone and product.",
      productWords.length < 5
        ? "The product is still abstract. Name the blank or first output."
        : "The product promise is concrete enough to build a drop around.",
      copy.toLowerCase().includes("ai") && !copy.toLowerCase().includes("culture")
        ? "Your copy sounds like software. Add cultural language."
        : "The copy has a better chance of sounding like culture, not just software."
    ];

    const verdict =
      total >= 82
        ? "Strong. Now protect it, visualize it, and make the first blank tangible."
        : total >= 66
          ? "Promising, but not sharp enough yet. The critic wants more specificity."
          : "Not ready. The idea needs a clearer name, audience, product, and cultural enemy.";

    return { total, nameScore, audienceScore, productScore, copyScore, warnings, verdict };
  }, [name, audience, product, copy]);

  const report = `LOOMWIRE Brand Critic
Name: ${name}
Audience: ${audience}
Product: ${product}
Copy: ${copy}
Score: ${critique.total}
Verdict: ${critique.verdict}
Warnings:
${critique.warnings.map((warning) => `- ${warning}`).join("\n")}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <section className="paper-panel relative z-10 p-5 sm:p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-signal">
              Harsh but useful
            </p>
            <h2 className="editorial-heading mt-2 text-4xl text-paper">
              Feed the critic.
            </h2>
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setName("LOOMWIRE");
              setAudience("unknown creators, artists, founders, designers");
              setProduct("AI brand operating system with proof vault and lookbook engine");
              setCopy("Turn an idea into a protected cultural system.");
            }}
          >
            <RotateCcw size={18} />
            Sample
          </button>
        </div>

        <div className="grid gap-4">
          <label>
            <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
              Brand name
            </span>
            <input className="field px-3 py-3" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
              Audience
            </span>
            <input className="field px-3 py-3" value={audience} onChange={(event) => setAudience(event.target.value)} />
          </label>
          <label>
            <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
              Product / blank
            </span>
            <textarea className="field min-h-[100px] px-3 py-3" value={product} onChange={(event) => setProduct(event.target.value)} />
          </label>
          <label>
            <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
              Hero copy
            </span>
            <textarea className="field min-h-[100px] px-3 py-3" value={copy} onChange={(event) => setCopy(event.target.value)} />
          </label>
        </div>
      </section>

      <section className="paper-panel relative z-10 p-5 sm:p-6">
        <div className="flex flex-col gap-5 border-b border-paper/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-signal">
              <TriangleAlert size={15} />
              Brand Critic Verdict
            </p>
            <h2 className="editorial-heading mt-2 text-4xl text-paper">
              {critique.total} / 100
            </h2>
          </div>
          <div
            className="score-ring grid h-28 w-28 shrink-0 place-items-center rounded-full"
            style={{ "--score": critique.total } as React.CSSProperties}
          >
            <Flame className="text-signal" size={30} />
          </div>
        </div>

        <p className="mt-5 rounded-md border border-signal/35 bg-signal/10 p-4 text-sm leading-7 text-bone">
          {critique.verdict}
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {[
            ["Name", critique.nameScore],
            ["Audience", critique.audienceScore],
            ["Product", critique.productScore],
            ["Copy", critique.copyScore]
          ].map(([label, score]) => (
            <div key={label} className="rounded-md border border-paper/10 bg-paper/[0.035] p-3">
              <div className="flex items-center justify-between text-sm font-black text-paper">
                <span>{label}</span>
                <span className="text-volt">{score}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded bg-paper/10">
                <div className="h-full bg-volt" style={{ width: `${score}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-paper">
            <Gauge size={17} className="text-wire" />
            Notes
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-bone">
            {critique.warnings.map((warning) => (
              <li key={warning} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(report);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1600);
            }}
          >
            <Copy size={18} />
            {copied ? "Copied" : "Copy Report"}
          </button>
          <SaveToVaultButton
            record={{
              title: `Brand Critic report for ${name}`,
              category: "Launch proof",
              notes: report
            }}
          />
        </div>
      </section>
    </div>
  );
}
