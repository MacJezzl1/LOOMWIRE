import { BrandCriticTool } from "@/components/BrandCriticTool";

export const metadata = {
  title: "Brand Critic | LOOMWIRE"
};

export default function CriticPage() {
  return (
    <main className="min-h-screen">
      <section className="grid-band border-b border-paper/10 py-16">
        <div className="atelier-shell">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-signal">
            AI Brand Critic
          </p>
          <h1 className="editorial-heading mt-3 max-w-5xl text-5xl leading-none text-paper sm:text-7xl">
            A harsh critic for names that almost work.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-bone">
            Test whether the brand sounds like a cultural system or just another
            generic AI product. Copy the report or save it into the Vault.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="atelier-shell">
          <BrandCriticTool />
        </div>
      </section>
    </main>
  );
}
