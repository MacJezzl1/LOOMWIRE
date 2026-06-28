import Image from "next/image";
import { CommerceConnector } from "@/components/CommerceConnector";

export default function CommercePage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-paper/10">
        <div className="absolute inset-0">
          <Image
            src="/art/paintings/loomwire-drop-room-painting.png"
            alt="LOOMWIRE drop room painting with street-art commerce energy."
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,5,0.96),rgba(7,7,5,0.78),rgba(7,7,5,0.42))]" />
        </div>
        <div className="atelier-shell relative z-10 grid min-h-[56vh] gap-8 py-16 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
              Shopify + Drops
            </p>
            <h1 className="editorial-heading mt-4 max-w-[10ch] text-5xl leading-none text-paper sm:text-7xl">
              The drop becomes commerce.
            </h1>
          </div>
          <p className="max-w-3xl text-base leading-8 text-bone sm:text-lg">
            Connect LOOMWIRE to Shopify with the user's own store credentials,
            prepare a protected draft product, export the launch kit, and save
            the commerce record back into the Creator Proof Vault.
          </p>
        </div>
      </section>

      <section className="grid-band py-8 sm:py-12">
        <div className="atelier-shell">
          <CommerceConnector />
        </div>
      </section>
    </main>
  );
}
