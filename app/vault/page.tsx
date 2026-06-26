import { VaultSystem } from "@/components/VaultSystem";

export const metadata = {
  title: "Creator Proof Vault | LOOMWIRE"
};

export default function VaultPage() {
  return (
    <main className="min-h-screen">
      <section className="grid-band border-b border-paper/10 py-12">
        <div className="atelier-shell">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-wire">
            Vault System
          </p>
          <h1 className="editorial-heading mt-3 max-w-5xl text-5xl leading-none text-paper sm:text-7xl">
            A protected archive for creator evidence.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-bone">
            Unlock, record, timestamp, export, and seal your creative proof.
            This is preparation and recordkeeping, not legal advice.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="atelier-shell">
          <VaultSystem />
        </div>
      </section>
    </main>
  );
}
