import { BrandSystemGenerator } from "@/components/BrandSystemGenerator";

export const metadata = {
  title: "Atelier | LOOMWIRE"
};

export default function AtelierPage() {
  return (
    <main className="min-h-screen">
      <section className="grid-band border-b border-paper/10 py-14">
        <div className="atelier-shell">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
            Atelier Console
          </p>
          <h1 className="editorial-heading mt-3 max-w-5xl text-5xl leading-none text-paper sm:text-7xl">
            Build the first complete brand system.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-bone">
            Enter the idea, choose the AI lane, and generate names, manifesto,
            IP checklist, visual direction, product blank, lookbook outline,
            launch plan, Brand DNA Score, and critic notes.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="atelier-shell">
          <BrandSystemGenerator />
        </div>
      </section>
    </main>
  );
}
