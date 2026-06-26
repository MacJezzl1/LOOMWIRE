import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CircuitBoard,
  Compass,
  Globe2,
  Images,
  LockKeyhole,
  Siren,
  Sparkles
} from "lucide-react";
import { AtelierScene } from "@/components/AtelierScene";
import { RoomCard } from "@/components/RoomCard";
import { rooms } from "@/lib/rooms";

const comparisons = [
  ["Shopify", "helps you sell."],
  ["Canva", "helps you design."],
  ["Notion", "helps you organize."],
  ["LOOMWIRE", "helps you turn an idea into a protected cultural universe."]
];

const featureLinks = [
  {
    href: "/gallery",
    title: "Gallery Wall",
    icon: Images,
    text: "Original LOOMWIRE paintings for rooms, culture maps, drops, and GitHub presentation."
  },
  {
    href: "/cultural-map",
    title: "Cultural Map",
    icon: Compass,
    text: "Select the cultures the brand belongs to and generate a signal score plus room path."
  },
  {
    href: "/critic",
    title: "AI Brand Critic",
    icon: Siren,
    text: "A harsh working critic that scores name, audience, product clarity, and hero copy."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative min-h-[calc(100vh-65px)] border-b border-paper/10">
        <AtelierScene />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,5,0.96)_0%,rgba(7,7,5,0.74)_48%,rgba(7,7,5,0.22)_100%)]" />
        <div className="atelier-shell relative z-10 grid min-h-[calc(100vh-65px)] gap-8 py-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex rounded border border-volt/50 bg-volt/10 px-3 py-2 text-xs font-black uppercase tracking-[0.24em] text-volt">
              Turn an idea into a protected cultural system.
            </p>
            <h1 className="editorial-heading max-w-[14ch] text-5xl leading-[0.95] text-paper sm:max-w-[18ch] sm:text-6xl xl:text-7xl">
              <span className="block">BUILD THE NAME.</span>
              <span className="block">PROTECT THE IDEA.</span>
              <span className="block">DESIGN THE WORLD.</span>
              <span className="block">RELEASE THE DROP.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-bone sm:text-lg">
              LOOMWIRE is an AI-powered brand operating system for founders,
              artists, designers, musicians, fashion labels, and cultural
              builders turning raw ideas into protected, visual, sellable worlds.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="btn btn-primary" href="/atelier">
                <Sparkles size={18} />
                Enter the Atelier
              </Link>
              <Link className="btn btn-ghost" href="/vault">
                <LockKeyhole size={18} />
                Open the Vault
              </Link>
            </div>
          </div>

          <Link href="/rooms/lookbook-engine" className="paper-panel group p-3 shadow-atelier">
            <div className="relative aspect-[4/5] min-h-[440px] overflow-hidden rounded-md border border-paper/10 bg-carbon">
              <Image
                src="/art/loomwire-poster-collage.png"
                alt="Original LOOMWIRE poster collage showing a street-art brand archive."
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover transition duration-500 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(7,7,5,0.9)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="mb-3 h-px w-full bg-paper/20" />
                <p className="text-xs font-black uppercase tracking-[0.24em] text-volt">
                  Living Lookbook
                </p>
                <p className="mt-2 flex items-center gap-2 text-2xl font-black text-paper">
                  The lookbook is the new pitch deck.
                  <ArrowUpRight size={20} className="text-wire" />
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="grid-band py-16">
        <div className="atelier-shell">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-wire">
                The Building
              </p>
              <h2 className="editorial-heading mt-3 text-4xl text-paper sm:text-6xl">
                Every room has its own job.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-bone">
              The product now works like an atelier, not a single dashboard.
              Each room has a dedicated page, a clear output, and a reason to
              exist inside the brand operating system.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-paper/10 bg-paper/[0.035]">
        <div className="atelier-shell grid gap-8 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-paper/10">
            <Image
              src="/art/loomwire-vault-padlock.png"
              alt="Artful LOOMWIRE padlock for the creator proof vault."
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,5,0.08),rgba(7,7,5,0.86))]" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
              Creator Proof Vault
            </p>
            <h2 className="editorial-heading mt-3 text-4xl text-paper sm:text-6xl">
              A padlock for the proof.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-bone">
              Store creator evidence in a local vault: names, logos, artwork,
              first product blanks, lookbook notes, domain checks, and launch
              proof. Unlock it, timestamp records, export the pack, and seal it
              again.
            </p>
            <Link className="btn btn-primary mt-7" href="/vault">
              <LockKeyhole size={18} />
              Enter the Vault
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="atelier-shell">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-wire">
                Working Systems
              </p>
              <h2 className="editorial-heading mt-3 text-4xl text-paper sm:text-6xl">
                More than pages. Clicks create proof.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-bone">
              These tools create records, exports, critiques, and cultural map
              decisions that can be saved back into the Creator Proof Vault.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featureLinks.map(({ href, title, icon: Icon, text }) => (
              <Link
                key={href}
                href={href}
                className="paper-panel group min-h-[230px] p-5 transition hover:-translate-y-1 hover:border-volt/50"
              >
                <Icon className="text-wire" size={26} />
                <h3 className="mt-8 flex items-center justify-between gap-3 text-xl font-black text-paper">
                  {title}
                  <ArrowUpRight
                    className="text-bone/50 transition group-hover:text-volt"
                    size={20}
                  />
                </h3>
                <p className="mt-4 text-sm leading-7 text-bone">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="atelier-shell grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-wire">
              Global Position
            </p>
            <h2 className="editorial-heading mt-3 text-4xl text-paper sm:text-6xl">
              A cultural operating system.
            </h2>
            <p className="mt-5 text-base leading-8 text-bone">
              Built by CapeChain Labs, LOOMWIRE is infrastructure for the next
              generation of founders, artists, designers, and creators.
            </p>
          </div>

          <div className="grid gap-3">
            {comparisons.map(([name, text]) => (
              <article
                key={name}
                className={`grid gap-3 rounded-md border p-4 sm:grid-cols-[180px_1fr] ${
                  name === "LOOMWIRE"
                    ? "border-volt/60 bg-volt/10"
                    : "border-paper/10 bg-paper/[0.035]"
                }`}
              >
                <h3 className="flex items-center gap-2 text-xl font-black text-paper">
                  {name === "LOOMWIRE" ? <Globe2 size={20} className="text-volt" /> : null}
                  {name}
                </h3>
                <p className="text-base leading-7 text-bone">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-paper/10 bg-carbon py-4">
        <div className="marquee-track flex w-[200%] gap-8 whitespace-nowrap text-xs font-black uppercase tracking-[0.24em] text-bone/70">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex min-w-1/2 gap-8">
              <span>Brand DNA Score</span>
              <span>Creator Proof Vault</span>
              <span>Lookbook as Website</span>
              <span>Cultural Map</span>
              <span>AI Brand Critic</span>
              <span>Drop Room</span>
              <span>Brand System Generator</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-10">
        <div className="atelier-shell flex flex-col gap-5 border-t border-paper/10 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-sm leading-7 text-bone/75">
            LOOMWIRE exists for the founder with no studio, the artist with no
            team, and the creator with a name in their head but no system around it.
          </p>
          <Link className="btn btn-ghost" href="/rooms">
            <CircuitBoard size={18} />
            Walk the Rooms
          </Link>
        </div>
      </footer>
    </main>
  );
}
