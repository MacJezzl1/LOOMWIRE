"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Archive,
  CalendarCheck,
  CheckCircle2,
  Copy,
  Download,
  Gauge,
  PackageCheck,
  RotateCcw,
  Rocket,
  Save,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp
} from "lucide-react";
import { saveVaultRecord } from "@/components/SaveToVaultButton";
import {
  BrandSystem,
  generateLocalBrandSystem
} from "@/lib/loomwire";

type LaunchProfile = {
  brandName: string;
  dropName: string;
  blank: string;
  audience: string;
  channel: string;
  price: number;
  cost: number;
  units: number;
  campaignDays: number;
};

type Task = {
  id: string;
  label: string;
  proof: string;
};

type Phase = {
  id: string;
  number: string;
  title: string;
  thesis: string;
  tasks: Task[];
};

const fallbackBrief = {
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

const fallbackSystem = generateLocalBrandSystem(fallbackBrief);

const phases: Phase[] = [
  {
    id: "proof",
    number: "01",
    title: "Name / Proof",
    thesis: "Lock the reason, risk checks, and evidence before public noise.",
    tasks: [
      {
        id: "final-name",
        label: "Final name selected with a ten-year meaning.",
        proof: "Name Room rationale"
      },
      {
        id: "domain-handles",
        label: "Domain, social handles, and similar-name risks checked.",
        proof: "IP Room checklist"
      },
      {
        id: "evidence-pack",
        label: "First evidence record sealed into the Creator Proof Vault.",
        proof: "Vault timestamp"
      }
    ]
  },
  {
    id: "studio",
    number: "02",
    title: "Studio / Lookbook",
    thesis: "Make the visual world specific enough to sell and be remembered.",
    tasks: [
      {
        id: "logo-direction",
        label: "Logo direction and artwork prompt written.",
        proof: "Studio prompt"
      },
      {
        id: "campaign-poster",
        label: "Campaign poster or painting direction selected.",
        proof: "Gallery artifact"
      },
      {
        id: "lookbook-outline",
        label: "Lookbook sequence drafted from cover to drop page.",
        proof: "Lookbook outline"
      }
    ]
  },
  {
    id: "commerce",
    number: "03",
    title: "Commerce / Blank",
    thesis: "Turn the cultural object into a priced product with margin logic.",
    tasks: [
      {
        id: "blank-costed",
        label: "First blank chosen and costed.",
        proof: "Blank Room sheet"
      },
      {
        id: "quantity-price",
        label: "Quantity, launch price, and gross margin set.",
        proof: "Drop math"
      },
      {
        id: "supplier-note",
        label: "Supplier, fulfillment, or delivery note written.",
        proof: "Operations note"
      }
    ]
  },
  {
    id: "release",
    number: "04",
    title: "Release / Community",
    thesis: "Arrange the waitlist, launch rhythm, and proof after the drop.",
    tasks: [
      {
        id: "waitlist-copy",
        label: "Waitlist or landing-page copy drafted.",
        proof: "Launch page copy"
      },
      {
        id: "content-calendar",
        label: "Campaign content calendar planned.",
        proof: "Drop Room calendar"
      },
      {
        id: "post-drop",
        label: "Post-drop archive and community follow-up defined.",
        proof: "Archive record"
      }
    ]
  }
];

const initialChecked = phases.reduce<Record<string, boolean>>((current, phase) => {
  phase.tasks.forEach((task, index) => {
    current[task.id] = phase.id === "proof" && index < 2;
  });
  return current;
}, {});

function numberField(value: number) {
  return Number.isFinite(value) ? value : 0;
}

function profileFromSystem(system: BrandSystem): LaunchProfile {
  const name = system.nameOptions[0]?.name || "LOOMWIRE Brand";

  return {
    brandName: name,
    dropName: system.productDrop.name || `${name} DROP 001`,
    blank: system.productDrop.blank || "Hoodie, digital pass, and launch website",
    audience:
      system.socialBio ||
      "Founders, artists, designers, musicians, and culture builders.",
    channel: "Waitlist, lookbook page, Instagram carousel, founder letter",
    price: 120,
    cost: 42,
    units: 120,
    campaignDays: 10
  };
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function readLatestSystem() {
  try {
    const stored = window.localStorage.getItem("loomwire-latest-brand-system");
    return stored ? (JSON.parse(stored) as BrandSystem) : fallbackSystem;
  } catch {
    return fallbackSystem;
  }
}

function downloadJson(profile: LaunchProfile, checked: Record<string, boolean>) {
  const payload = {
    exportedAt: new Date().toISOString(),
    profile,
    checked,
    phases
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${profile.dropName || "loomwire-launch-board"}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .concat(".json");
  anchor.click();
  URL.revokeObjectURL(url);
}

export function LaunchBoard() {
  const [brandSystem, setBrandSystem] = useState<BrandSystem>(fallbackSystem);
  const [profile, setProfile] = useState<LaunchProfile>(() =>
    profileFromSystem(fallbackSystem)
  );
  const [checked, setChecked] = useState<Record<string, boolean>>(initialChecked);
  const [message, setMessage] = useState("Loading launch board state.");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const latest = readLatestSystem();
    setBrandSystem(latest);

    try {
      const saved = window.localStorage.getItem("loomwire-launch-board");
      if (saved) {
        const parsed = JSON.parse(saved) as {
          profile?: LaunchProfile;
          checked?: Record<string, boolean>;
        };
        setProfile(parsed.profile || profileFromSystem(latest));
        setChecked({ ...initialChecked, ...(parsed.checked || {}) });
      } else {
        setProfile(profileFromSystem(latest));
      }
    } catch {
      setProfile(profileFromSystem(latest));
      setChecked(initialChecked);
    } finally {
      setHydrated(true);
      setMessage("Launch board ready.");
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(
      "loomwire-launch-board",
      JSON.stringify({ profile, checked })
    );
  }, [checked, hydrated, profile]);

  const totalTasks = phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const completedTasks = Object.values(checked).filter(Boolean).length;
  const taskScore = Math.round((completedTasks / totalTasks) * 100);
  const revenue = numberField(profile.price) * numberField(profile.units);
  const profit =
    (numberField(profile.price) - numberField(profile.cost)) *
    numberField(profile.units);
  const margin =
    profile.price > 0
      ? Math.max(0, Math.round(((profile.price - profile.cost) / profile.price) * 100))
      : 0;
  const readiness = Math.min(
    100,
    Math.round(
      taskScore * 0.58 +
        Math.min(100, margin) * 0.18 +
        (profile.campaignDays >= 10 ? 12 : 7) +
        (profile.audience.trim().length > 24 ? 12 : 5)
    )
  );

  const nextTask = useMemo(() => {
    for (const phase of phases) {
      const task = phase.tasks.find((item) => !checked[item.id]);
      if (task) {
        return `${phase.title}: ${task.label}`;
      }
    }
    return "All launch proof tasks are complete. Move to release review.";
  }, [checked]);

  function updateProfile<K extends keyof LaunchProfile>(
    key: K,
    value: LaunchProfile[K]
  ) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function loadLatestSystem() {
    if (!hydrated) {
      return;
    }

    const latest = readLatestSystem();
    setBrandSystem(latest);
    setProfile(profileFromSystem(latest));
    setMessage("Loaded the latest Atelier brand system into the launch board.");
  }

  function resetBoard() {
    if (!hydrated) {
      return;
    }

    const nextProfile = profileFromSystem(brandSystem);
    setProfile(nextProfile);
    setChecked(initialChecked);
    setMessage("Launch board reset to the current brand system.");
  }

  function buildReport() {
    const done = phases
      .flatMap((phase) =>
        phase.tasks
          .filter((task) => checked[task.id])
          .map((task) => `${phase.number} ${phase.title}: ${task.label}`)
      )
      .join("\n");

    return `LOOMWIRE Launch Board
Brand: ${profile.brandName}
Drop: ${profile.dropName}
Blank: ${profile.blank}
Audience: ${profile.audience}
Channel: ${profile.channel}
Readiness: ${readiness}/100
Task Score: ${completedTasks}/${totalTasks}
Revenue Target: ${money(revenue)}
Gross Profit Target: ${money(profit)}
Gross Margin: ${margin}%
Campaign: ${profile.campaignDays} days
Next Move: ${nextTask}

Completed Proof:
${done || "No completed proof tasks yet."}

Positioning:
${brandSystem.positioning.join("\n")}`;
  }

  async function copyReport() {
    if (!hydrated) {
      return;
    }

    try {
      await navigator.clipboard.writeText(buildReport());
      setMessage("Launch brief copied.");
    } catch {
      setMessage("Clipboard is unavailable. Use export or save to Vault instead.");
    }
  }

  async function saveToVault() {
    if (!hydrated) {
      return;
    }

    setMessage("Saving launch board to the Vault.");
    await saveVaultRecord({
      title: `${profile.dropName} Launch Board`,
      category: "Launch proof",
      notes: buildReport()
    });
    setMessage("Launch board sealed into the Creator Proof Vault.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="grid gap-4">
        <div className="paper-panel acid-edge p-4 sm:p-5">
          <div className="flex flex-col gap-4 border-b border-paper/10 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
                Launch Board
              </p>
              <h2 className="editorial-heading mt-2 text-3xl text-paper sm:text-5xl">
                Turn the lookbook into a release.
              </h2>
            </div>
            <div
              className="score-ring grid h-28 w-28 shrink-0 place-items-center rounded-full"
              style={{ "--score": readiness } as CSSProperties}
              aria-label={`Launch readiness score ${readiness}`}
            >
              <div className="text-center">
                <div className="text-3xl font-black text-volt">{readiness}</div>
                <div className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-bone">
                  ready
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label>
                <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                  Brand name
                </span>
                <input
                  className="field px-3 py-3 text-sm"
                  disabled={!hydrated}
                  value={profile.brandName}
                  onChange={(event) => updateProfile("brandName", event.target.value)}
                />
              </label>
              <label>
                <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                  Drop name
                </span>
                <input
                  className="field px-3 py-3 text-sm"
                  disabled={!hydrated}
                  value={profile.dropName}
                  onChange={(event) => updateProfile("dropName", event.target.value)}
                />
              </label>
            </div>

            <label>
              <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                First blank
              </span>
              <input
                className="field px-3 py-3 text-sm"
                disabled={!hydrated}
                value={profile.blank}
                onChange={(event) => updateProfile("blank", event.target.value)}
              />
            </label>

            <label>
              <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                Audience
              </span>
              <textarea
                className="field min-h-[94px] px-3 py-3 text-sm"
                disabled={!hydrated}
                value={profile.audience}
                onChange={(event) => updateProfile("audience", event.target.value)}
              />
            </label>

            <label>
              <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                Release channel mix
              </span>
              <input
                className="field px-3 py-3 text-sm"
                disabled={!hydrated}
                value={profile.channel}
                onChange={(event) => updateProfile("channel", event.target.value)}
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-4">
              {[
                ["price", "Launch price", profile.price],
                ["cost", "Unit cost", profile.cost],
                ["units", "Units", profile.units],
                ["campaignDays", "Campaign days", profile.campaignDays]
              ].map(([key, label, value]) => (
                <label key={key}>
                  <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                    {label}
                  </span>
                  <input
                    className="field px-3 py-3 text-sm"
                    type="number"
                    min={0}
                    disabled={!hydrated}
                    value={value}
                    onChange={(event) =>
                      updateProfile(
                        key as keyof LaunchProfile,
                        Number(event.target.value) as never
                      )
                    }
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!hydrated}
              onClick={saveToVault}
            >
              <Save size={18} />
              Save to Vault
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              disabled={!hydrated}
              onClick={copyReport}
            >
              <Copy size={18} />
              Copy Brief
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              disabled={!hydrated}
              onClick={() => downloadJson(profile, checked)}
            >
              <Download size={18} />
              Export
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="btn btn-ghost"
              disabled={!hydrated}
              onClick={loadLatestSystem}
            >
              <Sparkles size={18} />
              Load Atelier System
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              disabled={!hydrated}
              onClick={resetBoard}
            >
              <RotateCcw size={18} />
              Reset Board
            </button>
            <Link className="btn btn-ghost" href="/vault">
              <Archive size={18} />
              Open Vault
            </Link>
          </div>

          <p className="mt-4 min-h-[28px] text-sm leading-relaxed text-bone/80">
            {message}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <article className="paper-panel p-4">
            <TrendingUp className="text-volt" size={22} />
            <div className="mt-3 text-2xl font-black text-paper">
              {money(revenue)}
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-bone/70">
              revenue target
            </p>
          </article>
          <article className="paper-panel p-4">
            <Gauge className="text-wire" size={22} />
            <div className="mt-3 text-2xl font-black text-paper">{margin}%</div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-bone/70">
              gross margin
            </p>
          </article>
          <article className="paper-panel p-4">
            <ShoppingBag className="text-signal" size={22} />
            <div className="mt-3 text-2xl font-black text-paper">
              {money(profit)}
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-bone/70">
              gross profit
            </p>
          </article>
          <article className="paper-panel p-4">
            <CalendarCheck className="text-volt" size={22} />
            <div className="mt-3 text-2xl font-black text-paper">
              {completedTasks}/{totalTasks}
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-bone/70">
              proof tasks
            </p>
          </article>
        </div>
      </section>

      <section className="grid gap-4">
        <div className="paper-panel p-4 sm:p-5">
          <div className="flex flex-col gap-3 border-b border-paper/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-wire">
                Next Move
              </p>
              <h3 className="mt-2 text-xl font-black text-paper">{nextTask}</h3>
            </div>
            <div className="rounded-md border border-volt/30 bg-volt/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-volt">
              {taskScore}% proof score
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-bone">
            The board combines task proof, campaign timing, audience clarity, and
            margin logic. It is not just a to-do list; it is a release evidence
            machine for the first drop.
          </p>
        </div>

        {phases.map((phase) => {
          const phaseDone = phase.tasks.filter((task) => checked[task.id]).length;

          return (
            <article key={phase.id} className="paper-panel p-4 sm:p-5">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-volt">
                    {phase.number}
                  </p>
                  <h3 className="mt-1 text-2xl font-black text-paper">
                    {phase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-bone">
                    {phase.thesis}
                  </p>
                </div>
                <div className="rounded-md border border-paper/10 bg-paper/[0.04] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-bone">
                  {phaseDone}/{phase.tasks.length}
                </div>
              </div>

              <div className="grid gap-3">
                {phase.tasks.map((task) => (
                  <label
                    key={task.id}
                    className={`flex cursor-pointer gap-3 rounded-md border p-3 transition ${
                      checked[task.id]
                        ? "border-volt/45 bg-volt/10"
                        : "border-paper/10 bg-paper/[0.035] hover:border-wire/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 accent-[#b7ff4a]"
                      disabled={!hydrated}
                      checked={Boolean(checked[task.id])}
                      onChange={(event) =>
                        setChecked((current) => ({
                          ...current,
                          [task.id]: event.target.checked
                        }))
                      }
                    />
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 font-black text-paper">
                        {checked[task.id] ? (
                          <CheckCircle2 size={16} className="text-volt" />
                        ) : (
                          <PackageCheck size={16} className="text-wire" />
                        )}
                        {task.label}
                      </span>
                      <span className="mt-1 block text-xs font-bold uppercase tracking-[0.14em] text-bone/60">
                        Proof: {task.proof}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </article>
          );
        })}

        <div className="paper-panel p-4 sm:p-5">
          <div className="flex items-center gap-2 text-wire">
            <Target size={20} />
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-paper">
              Brand System Signal
            </h3>
          </div>
          <div className="mt-4 grid gap-3">
            {brandSystem.launchPlan.slice(0, 4).map((item) => (
              <p
                key={item}
                className="rounded-md border border-paper/10 bg-paper/[0.035] p-3 text-sm leading-7 text-bone"
              >
                {item}
              </p>
            ))}
          </div>
          <Link className="btn btn-primary mt-4" href="/atelier">
            <Rocket size={18} />
            Regenerate in Atelier
          </Link>
        </div>
      </section>
    </div>
  );
}
