import Image from "next/image";
import Link from "next/link";
import { Archive, Rocket, Sparkles } from "lucide-react";
import { LaunchBoard } from "@/components/LaunchBoard";

export const metadata = {
  title: "Launch Board | LOOMWIRE"
};

export default function LaunchBoardPage() {
  return (
    <main className="min-h-screen">
      <section className="grid-band border-b border-paper/10 py-16">
        <div className="atelier-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
              Launch Board
            </p>
            <h1 className="editorial-heading mt-3 max-w-5xl text-5xl leading-none text-paper sm:text-7xl">
              The drop needs proof, price, and rhythm.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-bone">
              Build the release plan from the latest Atelier system: tasks,
              readiness, campaign math, next move, export, and Creator Proof
              Vault record.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="btn btn-primary" href="/atelier">
                <Sparkles size={18} />
                Generate System
              </Link>
              <Link className="btn btn-ghost" href="/vault">
                <Archive size={18} />
                Open Vault
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-paper/10">
            <Image
              src="/art/paintings/loomwire-drop-room-painting.png"
              alt="Original LOOMWIRE drop room painting."
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,5,0.08),rgba(7,7,5,0.82))]" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="inline-flex items-center gap-2 rounded-md border border-volt/40 bg-volt/10 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-volt">
                <Rocket size={15} />
                Release intelligence
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="atelier-shell">
          <LaunchBoard />
        </div>
      </section>
    </main>
  );
}
