import { RoomCard } from "@/components/RoomCard";
import { rooms } from "@/lib/rooms";

export const metadata = {
  title: "Rooms | LOOMWIRE"
};

export default function RoomsPage() {
  return (
    <main className="min-h-screen">
      <section className="grid-band border-b border-paper/10 py-16">
        <div className="atelier-shell">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-wire">
            LOOMWIRE Rooms
          </p>
          <h1 className="editorial-heading mt-3 max-w-5xl text-5xl leading-none text-paper sm:text-7xl">
            A building for turning ideas into systems.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-bone">
            Each room owns one part of the journey: name, protection, visual
            identity, product blank, lookbook, and release strategy.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="atelier-shell grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>
      </section>
    </main>
  );
}
