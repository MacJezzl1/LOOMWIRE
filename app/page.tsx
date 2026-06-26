import Image from "next/image";
import {
  Archive,
  BookOpen,
  Boxes,
  Brain,
  CircuitBoard,
  GalleryHorizontalEnd,
  Globe2,
  LockKeyhole,
  Megaphone,
  PenLine,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { AtelierScene } from "@/components/AtelierScene";
import { BrandSystemGenerator } from "@/components/BrandSystemGenerator";

const rooms = [
  {
    title: "The Name Room",
    text: "Name logic, manifesto lines, slogans, tone, and positioning.",
    icon: Brain
  },
  {
    title: "The IP Room",
    text: "Trademark prep, ownership records, evidence packs, and creator timelines.",
    icon: ShieldCheck
  },
  {
    title: "The Studio",
    text: "Moodboards, logo prompts, typography direction, posters, mockups, and campaign art.",
    icon: GalleryHorizontalEnd
  },
  {
    title: "The Blank Room",
    text: "Clothing, books, AI tools, music rollouts, events, memberships, sites, and services.",
    icon: Boxes
  },
  {
    title: "Lookbook Engine",
    text: "A shoppable lookbook that can also become a pitch deck, launch page, and grant asset.",
    icon: BookOpen
  },
  {
    title: "The Archive",
    text: "Every name, visual, drop, campaign, and ownership record saved like a museum artifact.",
    icon: Archive
  }
];

const agents = [
  "Researcher",
  "Name Architect",
  "IP Guard",
  "Art Director",
  "Product Strategist",
  "Lookbook Editor",
  "Red-Team Agent"
];

const comparisons = [
  ["Shopify", "helps you sell."],
  ["Canva", "helps you design."],
  ["Notion", "helps you organize."],
  ["LOOMWIRE", "helps you turn an idea into a protected cultural universe."]
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative min-h-screen border-b border-paper/10 pb-12 pt-5">
        <AtelierScene />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,5,0.95)_0%,rgba(7,7,5,0.66)_44%,rgba(7,7,5,0.2)_100%)]" />
        <div className="atelier-shell relative z-10">
          <header className="flex items-center justify-between gap-5 py-3">
            <a href="#top" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md border border-wire/50 bg-wire/10 text-sm font-black text-volt">
                LW
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-black uppercase tracking-[0.24em] text-paper">
                  LOOMWIRE
                </span>
                <span className="block text-xs text-bone/70">
                  by CapeChain Labs
                </span>
              </span>
            </a>
            <nav className="hidden items-center gap-5 text-xs font-bold uppercase tracking-[0.2em] text-bone/70 lg:flex">
              <a className="transition hover:text-volt" href="#generator">
                Atelier
              </a>
              <a className="transition hover:text-volt" href="#rooms">
                Rooms
              </a>
              <a className="transition hover:text-volt" href="#agents">
                Agents
              </a>
              <a className="transition hover:text-volt" href="#archive">
                Archive
              </a>
            </nav>
            <a className="btn btn-ghost hidden sm:inline-flex" href="#generator">
              <Sparkles size={17} />
              Enter
            </a>
          </header>

          <div id="top" className="grid min-h-[calc(100vh-92px)] gap-8 py-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="max-w-4xl">
              <p className="mb-5 inline-flex rounded border border-volt/50 bg-volt/10 px-3 py-2 text-xs font-black uppercase tracking-[0.24em] text-volt">
                Turn an idea into a protected cultural system.
              </p>
              <h1 className="editorial-heading max-w-[13ch] text-5xl leading-[0.95] text-paper sm:max-w-[18ch] sm:text-6xl lg:text-6xl 2xl:text-7xl">
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
                <a className="btn btn-primary" href="#generator">
                  <Sparkles size={18} />
                  Enter the Atelier
                </a>
                <a className="btn btn-ghost" href="#rooms">
                  <CircuitBoard size={18} />
                  Build My First Brand System
                </a>
              </div>
            </div>

            <div className="paper-panel p-3 shadow-atelier">
              <div className="relative aspect-[4/5] min-h-[440px] overflow-hidden rounded-md border border-paper/10 bg-carbon">
                <Image
                  src="/art/loomwire-poster-collage.png"
                  alt="Original LOOMWIRE poster collage showing a street-art brand archive."
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(7,7,5,0.88)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="mb-3 h-px w-full bg-paper/20" />
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-volt">
                    Living Lookbook
                  </p>
                  <p className="mt-2 text-2xl font-black text-paper">
                    The lookbook is the new pitch deck.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid-band py-12">
        <div className="atelier-shell">
          <BrandSystemGenerator />
        </div>
      </section>

      <section id="rooms" className="py-20">
        <div className="atelier-shell">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-wire">
                Seven Rooms
              </p>
              <h2 className="editorial-heading mt-3 text-4xl text-paper sm:text-6xl">
                The name is the first product.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-bone">
              LOOMWIRE does not stop at a logo. It moves a creator through
              naming, IP preparation, art direction, product blanks, lookbook
              publishing, launch planning, and archive history.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {rooms.map(({ title, text, icon: Icon }) => (
              <article
                key={title}
                className="paper-panel min-h-[190px] p-5 transition hover:-translate-y-1 hover:border-volt/50"
              >
                <Icon className="mb-5 text-wire" size={25} />
                <h3 className="text-lg font-black uppercase tracking-[0.12em] text-paper">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-bone">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="agents" className="border-y border-paper/10 bg-paper/[0.035] py-16">
        <div className="atelier-shell">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-paper/10">
              <Image
                src="/art/loomwire-atelier-hero.png"
                alt="Original LOOMWIRE black-box creative lab with gallery lighting."
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,5,0.2),rgba(7,7,5,0.82))]" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
                Multi-Agent System
              </p>
              <h2 className="editorial-heading mt-3 text-4xl text-paper sm:text-6xl">
                Protect the idea before the world renames it.
              </h2>
              <div className="mt-7 grid gap-2 sm:grid-cols-2">
                {agents.map((agent) => (
                  <div
                    key={agent}
                    className="flex min-h-[56px] items-center gap-3 rounded-md border border-paper/10 bg-carbon/70 px-3 py-2"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-volt" />
                    <span className="text-sm font-black uppercase tracking-[0.14em] text-paper">
                      {agent}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-base leading-8 text-bone">
                Paid model users bring their own OpenAI, Claude, OpenRouter, or
                Groq keys. Free users can start with the local demo engine or
                connect an Ollama model while the platform grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="archive" className="py-20">
        <div className="atelier-shell">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-wire">
                Global Position
              </p>
              <h2 className="editorial-heading mt-3 text-4xl text-paper sm:text-6xl">
                A cultural operating system.
              </h2>
              <p className="mt-5 text-base leading-8 text-bone">
                Built by CapeChain Labs, LOOMWIRE is cultural infrastructure for
                the next generation of founders, artists, designers, and
                creators.
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
                  <h3 className="text-xl font-black text-paper">{name}</h3>
                  <p className="text-base leading-7 text-bone">{text}</p>
                </article>
              ))}
            </div>
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
            </div>
          ))}
        </div>
      </section>

      <footer className="py-10">
        <div className="atelier-shell flex flex-col gap-5 border-t border-paper/10 pt-7 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.24em] text-paper">
              LOOMWIRE
            </div>
            <p className="mt-2 text-sm text-bone/70">
              For the founder with no studio, the artist with no team, and the
              creator with a name in their head but no system around it.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.18em] text-bone/70">
            <span className="inline-flex items-center gap-1 rounded border border-paper/10 px-2 py-1">
              <LockKeyhole size={13} /> IP Prep
            </span>
            <span className="inline-flex items-center gap-1 rounded border border-paper/10 px-2 py-1">
              <Globe2 size={13} /> Global
            </span>
            <span className="inline-flex items-center gap-1 rounded border border-paper/10 px-2 py-1">
              <Megaphone size={13} /> Commerce
            </span>
            <span className="inline-flex items-center gap-1 rounded border border-paper/10 px-2 py-1">
              <PenLine size={13} /> Culture
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
