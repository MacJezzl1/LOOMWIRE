import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CircuitBoard,
  ShieldAlert,
  Sparkles
} from "lucide-react";
import { getRoom, rooms } from "@/lib/rooms";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

type RoomPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = getRoom(slug);
  return {
    title: room ? `${room.title} | LOOMWIRE` : "Room | LOOMWIRE"
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = getRoom(slug);

  if (!room) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-paper/10 py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,rgba(183,255,74,0.14),transparent_26rem),linear-gradient(180deg,rgba(244,239,228,0.05),transparent)]" />
        <div className="atelier-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
              Room {room.number} / {room.eyebrow}
            </p>
            <h1 className="editorial-heading mt-3 max-w-5xl text-5xl leading-none text-paper sm:text-7xl">
              {room.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-bone">
              {room.intro}
            </p>
          </div>
          <div className="paper-panel p-5">
            <div className="mb-5 flex items-center gap-3 text-wire">
              <CircuitBoard size={22} />
              <span className="text-xs font-black uppercase tracking-[0.24em]">
                Room Thesis
              </span>
            </div>
            <p className="editorial-heading text-3xl leading-tight text-paper">
              {room.thesis}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="atelier-shell grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="paper-panel p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2 text-volt">
              <BadgeCheck size={20} />
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-paper">
                Outputs
              </h2>
            </div>
            <div className="grid gap-3">
              {room.outputs.map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-paper/10 bg-paper/[0.035] p-4 text-sm leading-7 text-bone"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="paper-panel p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-2 text-wire">
                <Sparkles size={20} />
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-paper">
                  Instruments
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {room.instruments.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-paper/15 bg-paper/[0.045] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-bone"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="paper-panel border-signal/40 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-signal">
                <ShieldAlert size={20} />
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-paper">
                  Critic
                </h2>
              </div>
              <p className="text-sm leading-7 text-bone">{room.critic}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-paper/10 bg-paper/[0.035] py-10">
        <div className="atelier-shell flex flex-col gap-3 sm:flex-row">
          <Link className="btn btn-primary" href="/atelier">
            Use this in the Atelier
            <ArrowRight size={18} />
          </Link>
          <Link className="btn btn-ghost" href="/vault">
            Save proof in the Vault
          </Link>
          <Link className="btn btn-ghost" href="/rooms">
            Back to all rooms
          </Link>
        </div>
      </section>
    </main>
  );
}
