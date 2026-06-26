import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Room } from "@/lib/rooms";

export function RoomCard({ room }: { room: Room }) {
  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="paper-panel group min-h-[250px] p-5 transition hover:-translate-y-1 hover:border-volt/50"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="rounded border border-wire/40 px-2 py-1 text-xs font-black uppercase tracking-[0.2em] text-wire">
          Room {room.number}
        </span>
        <ArrowUpRight
          size={20}
          className="text-bone/50 transition group-hover:text-volt"
        />
      </div>
      <h3 className="editorial-heading mt-8 text-3xl leading-tight text-paper">
        {room.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-bone">{room.intro}</p>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-volt">
        {room.cta}
      </p>
    </Link>
  );
}
