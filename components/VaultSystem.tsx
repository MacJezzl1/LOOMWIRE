"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Archive,
  Download,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Plus,
  ShieldCheck,
  Trash2,
  UnlockKeyhole
} from "lucide-react";

type VaultEntry = {
  id: string;
  title: string;
  category: string;
  notes: string;
  createdAt: string;
};

const categories = [
  "Brand name",
  "Logo / artwork",
  "Product blank",
  "Lookbook",
  "Domain / handle",
  "Launch proof"
];

const sampleEntries: VaultEntry[] = [
  {
    id: "seed-name",
    title: "LOOMWIRE naming logic",
    category: "Brand name",
    notes:
      "The name connects imagination to execution: loom as culture-making, wire as infrastructure.",
    createdAt: "2026-06-26T04:00:00.000Z"
  },
  {
    id: "seed-lookbook",
    title: "Drop 001 lookbook direction",
    category: "Lookbook",
    notes:
      "Black gallery, acid green signal, warm yellow evidence paper, street archive poster language.",
    createdAt: "2026-06-26T04:20:00.000Z"
  }
];

function downloadVault(entries: VaultEntry[]) {
  const blob = new Blob([JSON.stringify({ exportedAt: new Date(), entries }, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "loomwire-creator-proof-vault.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function VaultSystem() {
  const [unlocked, setUnlocked] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [entries, setEntries] = useState<VaultEntry[]>(sampleEntries);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("Vault sealed.");

  useEffect(() => {
    const stored = window.localStorage.getItem("loomwire-vault-entries");
    if (stored) {
      try {
        setEntries(JSON.parse(stored) as VaultEntry[]);
      } catch {
        setEntries(sampleEntries);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("loomwire-vault-entries", JSON.stringify(entries));
  }, [entries]);

  const hash = useMemo(() => {
    const seed = entries.map((entry) => `${entry.id}:${entry.createdAt}`).join("|");
    let value = 0;
    for (let i = 0; i < seed.length; i += 1) {
      value = (value * 31 + seed.charCodeAt(i)) >>> 0;
    }
    return value.toString(16).toUpperCase().padStart(8, "0");
  }, [entries]);

  function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phrase.trim().length < 4) {
      setMessage("Use a creator phrase with at least 4 characters.");
      return;
    }
    setUnlocked(true);
    setMessage("Vault open. Record the proof while the idea is still warm.");
  }

  function addEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !notes.trim()) {
      setMessage("Add a title and notes before sealing a record.");
      return;
    }

    setEntries((current) => [
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        category,
        notes: notes.trim(),
        createdAt: new Date().toISOString()
      },
      ...current
    ]);
    setTitle("");
    setNotes("");
    setMessage("Evidence sealed into the local vault.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
      <section className="paper-panel overflow-hidden">
        <div className="relative min-h-[500px]">
          <Image
            src="/art/loomwire-vault-padlock.png"
            alt="Artful LOOMWIRE padlock for the creator proof vault."
            fill
            priority
            sizes="(min-width: 1280px) 40vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,5,0.1),rgba(7,7,5,0.92))]" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
              Creator Proof Vault
            </p>
            <h1 className="editorial-heading mt-3 text-4xl leading-none text-paper sm:text-6xl">
              Seal the proof before the world sees the idea.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-bone">
              A local ownership timeline for names, logos, artwork, product
              blanks, lookbooks, launch pages, and first-use notes.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 grid gap-4">
        <div className="paper-panel p-4 sm:p-5">
          <div className="flex flex-col gap-4 border-b border-paper/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-wire">
                Vault State
              </p>
              <h2 className="mt-2 flex items-center gap-2 text-2xl font-black text-paper">
                {unlocked ? <UnlockKeyhole className="text-volt" /> : <LockKeyhole className="text-wire" />}
                {unlocked ? "Unlocked" : "Locked"}
              </h2>
            </div>
            <div className="rounded-md border border-volt/30 bg-volt/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-volt">
              Hash {hash}
            </div>
          </div>

          {!unlocked ? (
            <form onSubmit={unlock} className="mt-5 grid gap-3">
              <label>
                <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                  Creator phrase
                </span>
                <input
                  className="field px-3 py-3 text-sm"
                  value={phrase}
                  onChange={(event) => setPhrase(event.target.value)}
                  placeholder="Example: protect the first blank"
                  type="password"
                />
              </label>
              <button className="btn btn-primary" type="submit">
                <KeyRound size={18} />
                Unlock Proof Vault
              </button>
            </form>
          ) : (
            <form onSubmit={addEntry} className="mt-5 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
                <label>
                  <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                    Evidence title
                  </span>
                  <input
                    className="field px-3 py-3 text-sm"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="First hoodie sketch, logo draft, handle check..."
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                    Category
                  </span>
                  <select
                    className="field px-3 py-3 text-sm"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                  Proof notes
                </span>
                <textarea
                  className="field min-h-[120px] px-3 py-3 text-sm"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="What was created, by who, when, why it matters, where the source file lives..."
                />
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="btn btn-primary flex-1" type="submit">
                  <Plus size={18} />
                  Seal Evidence
                </button>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => downloadVault(entries)}
                >
                  <Download size={18} />
                  Export
                </button>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => {
                    setUnlocked(false);
                    setPhrase("");
                    setMessage("Vault sealed.");
                  }}
                >
                  <LockKeyhole size={18} />
                  Lock
                </button>
              </div>
            </form>
          )}

          <p className="mt-4 min-h-[28px] text-sm leading-relaxed text-bone/80">
            {message}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="paper-panel p-4">
            <Fingerprint className="text-volt" size={22} />
            <div className="mt-3 text-2xl font-black text-paper">{entries.length}</div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-bone/70">
              records
            </p>
          </div>
          <div className="paper-panel p-4">
            <ShieldCheck className="text-wire" size={22} />
            <div className="mt-3 text-2xl font-black text-paper">Local</div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-bone/70">
              browser vault
            </p>
          </div>
          <div className="paper-panel p-4">
            <Archive className="text-signal" size={22} />
            <div className="mt-3 text-2xl font-black text-paper">JSON</div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-bone/70">
              export pack
            </p>
          </div>
        </div>

        <div className="paper-panel p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-paper">
              Ownership Timeline
            </h3>
            {unlocked ? (
              <button
                type="button"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-bone/70 transition hover:text-signal"
                onClick={() => {
                  setEntries(sampleEntries);
                  setMessage("Vault reset to sample records.");
                }}
              >
                <Trash2 size={14} />
                Reset
              </button>
            ) : null}
          </div>
          <div className="grid gap-3">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-md border border-paper/10 bg-paper/[0.035] p-3"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-volt">
                      {entry.category}
                    </p>
                    <h4 className="mt-1 font-black text-paper">{entry.title}</h4>
                  </div>
                  <time className="text-xs text-bone/60">
                    {new Date(entry.createdAt).toLocaleString()}
                  </time>
                </div>
                <p className="mt-3 text-sm leading-7 text-bone">{entry.notes}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
