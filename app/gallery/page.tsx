import { GalleryWall } from "@/components/GalleryWall";

export const metadata = {
  title: "Gallery | LOOMWIRE"
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <section className="grid-band border-b border-paper/10 py-16">
        <div className="atelier-shell">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-wire">
            Gallery Wall
          </p>
          <h1 className="editorial-heading mt-3 max-w-5xl text-5xl leading-none text-paper sm:text-7xl">
            Original paintings for a cultural operating system.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-bone">
            LOOMWIRE should feel like an online museum. This wall holds the
            project-owned paintings for rooms, maps, proof, and drops.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="atelier-shell">
          <GalleryWall />
        </div>
      </section>
    </main>
  );
}
