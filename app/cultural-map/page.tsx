import Image from "next/image";
import { CulturalMapBuilder } from "@/components/CulturalMapBuilder";

export const metadata = {
  title: "Cultural Map | LOOMWIRE"
};

export default function CulturalMapPage() {
  return (
    <main className="min-h-screen">
      <section className="grid-band border-b border-paper/10 py-16">
        <div className="atelier-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
              Cultural Map
            </p>
            <h1 className="editorial-heading mt-3 max-w-5xl text-5xl leading-none text-paper sm:text-7xl">
              Know the culture before designing the world.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-bone">
              Select the territories your brand belongs to. LOOMWIRE calculates
              cultural signal, recommends rooms, and stores the map in the Vault.
            </p>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-paper/10">
            <Image
              src="/art/paintings/loomwire-cultural-map-painting.png"
              alt="Original LOOMWIRE cultural map painting."
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,7,5,0.84))]" />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="atelier-shell">
          <CulturalMapBuilder />
        </div>
      </section>
    </main>
  );
}
