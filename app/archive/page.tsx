import Image from "next/image";
import Link from "next/link";
import { Archive, BookOpen, LockKeyhole, Sparkles } from "lucide-react";

const archiveItems = [
  "Name versions",
  "Logo drafts",
  "Prompt history",
  "Lookbook exports",
  "Drop records",
  "Ownership notes"
];

export const metadata = {
  title: "Archive | LOOMWIRE"
};

export default function ArchivePage() {
  return (
    <main className="min-h-screen">
      <section className="grid-band border-b border-paper/10 py-16">
        <div className="atelier-shell grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-wire">
              Museum Memory
            </p>
            <h1 className="editorial-heading mt-3 max-w-5xl text-5xl leading-none text-paper sm:text-7xl">
              Every version becomes part of the archive.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-bone">
              LOOMWIRE saves the cultural system as it evolves: names, visuals,
              blanks, lookbooks, campaigns, ownership records, and drop history.
            </p>
          </div>
          <div className="relative min-h-[480px] overflow-hidden rounded-lg border border-paper/10">
            <Image
              src="/art/loomwire-atelier-hero.png"
              alt="Original LOOMWIRE black-box creative lab with gallery lighting."
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,7,5,0.84))]" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="atelier-shell grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="paper-panel p-5 sm:p-6">
            <Archive className="text-wire" size={26} />
            <h2 className="editorial-heading mt-6 text-4xl text-paper">
              Archive logic
            </h2>
            <p className="mt-4 text-sm leading-7 text-bone">
              The archive is the memory layer. It keeps a record of what was
              created, why it changed, when it was exported, and how the brand
              moved from raw idea to public release.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link className="btn btn-primary" href="/vault">
                <LockKeyhole size={18} />
                Seal records in Vault
              </Link>
              <Link className="btn btn-ghost" href="/atelier">
                <Sparkles size={18} />
                Generate new system
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {archiveItems.map((item, index) => (
              <article
                key={item}
                className="paper-panel min-h-[160px] p-5"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-volt">
                  {(index + 1).toString().padStart(2, "0")}
                </p>
                <h3 className="mt-8 flex items-center gap-2 text-xl font-black text-paper">
                  <BookOpen size={20} className="text-wire" />
                  {item}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
