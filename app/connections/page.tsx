import Image from "next/image";
import { IntegrationDock } from "@/components/IntegrationDock";

export default function ConnectionsPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-paper/10">
        <div className="absolute inset-0">
          <Image
            src="/art/loomwire-poster-collage.png"
            alt="LOOMWIRE app dock poster collage."
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,5,0.96),rgba(7,7,5,0.74),rgba(7,7,5,0.36))]" />
        </div>
        <div className="atelier-shell relative z-10 grid min-h-[56vh] gap-8 py-16 lg:grid-cols-[0.82fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
              App Dock
            </p>
            <h1 className="editorial-heading mt-4 max-w-[11ch] text-5xl leading-none text-paper sm:text-7xl">
              Connect the stack around the culture.
            </h1>
          </div>
          <p className="max-w-3xl text-base leading-8 text-bone sm:text-lg">
            LOOMWIRE helps creators connect the tools that move a brand from
            idea to launch: commerce, payments, print production, storage,
            content systems, community, automation, hosting, and proof.
          </p>
        </div>
      </section>

      <section className="grid-band py-8 sm:py-12">
        <div className="atelier-shell">
          <IntegrationDock />
        </div>
      </section>
    </main>
  );
}
