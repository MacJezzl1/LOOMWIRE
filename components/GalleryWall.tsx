"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Download, Images, Palette } from "lucide-react";
import { paintings } from "@/lib/paintings";
import { SaveToVaultButton } from "@/components/SaveToVaultButton";

export function GalleryWall() {
  const [activeSlug, setActiveSlug] = useState(paintings[0].slug);
  const active = useMemo(
    () => paintings.find((painting) => painting.slug === activeSlug) || paintings[0],
    [activeSlug]
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
      <aside className="relative z-10 grid gap-3 xl:self-start">
        {paintings.map((painting) => (
          <button
            key={painting.slug}
            type="button"
            onClick={() => setActiveSlug(painting.slug)}
            className={`relative z-10 rounded-md border p-4 text-left transition ${
              active.slug === painting.slug
                ? "border-volt bg-volt/10"
                : "border-paper/10 bg-paper/[0.035] hover:border-wire/50"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-wire">
              {painting.room}
            </p>
            <h3 className="mt-3 text-xl font-black text-paper">{painting.title}</h3>
            <p className="mt-2 text-sm leading-6 text-bone/75">
              {painting.statement}
            </p>
          </button>
        ))}
      </aside>

      <section className="paper-panel overflow-hidden">
        <div className="relative min-h-[560px]">
          <Image
            src={active.image}
            alt={`${active.title} original LOOMWIRE painting.`}
            fill
            priority
            sizes="(min-width: 1280px) 65vw, 94vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,5,0.08),rgba(7,7,5,0.9))]" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.26em] text-volt">
              <Palette size={15} />
              {active.room}
            </p>
            <h2 className="editorial-heading mt-3 max-w-4xl text-4xl leading-none text-paper sm:text-6xl">
              {active.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-bone">
              {active.statement}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {active.evidence.map((item) => (
                <span
                  key={item}
                  className="rounded border border-paper/15 bg-carbon/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-bone"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link className="btn btn-primary" href={active.route}>
                <ArrowUpRight size={18} />
                Open Room
              </Link>
              <a className="btn btn-ghost" href={active.image} download>
                <Download size={18} />
                Download Painting
              </a>
              <SaveToVaultButton
                record={{
                  title: `${active.title} saved from Gallery`,
                  category: "Logo / artwork",
                  notes: `${active.statement} Evidence: ${active.evidence.join(", ")}.`
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="paper-panel p-4 xl:col-span-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-wire">
              <Images size={15} />
              GitHub-ready artwork
            </p>
            <p className="mt-2 text-sm leading-7 text-bone">
              These are original LOOMWIRE paintings stored in the repo and used
              across the site, README, and showcase docs.
            </p>
          </div>
          <Link className="btn btn-ghost" href="/archive">
            View Archive
          </Link>
        </div>
      </div>
    </div>
  );
}
