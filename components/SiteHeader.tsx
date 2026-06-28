import Image from "next/image";
import Link from "next/link";
import {
  Archive,
  Compass,
  Cpu,
  DoorOpen,
  Images,
  LockKeyhole,
  PlugZap,
  Rocket,
  ShoppingBag,
  Siren,
  Sparkles
} from "lucide-react";

const navItems = [
  { href: "/atelier", label: "Atelier", icon: Sparkles },
  { href: "/rooms", label: "Rooms", icon: DoorOpen },
  { href: "/launch-board", label: "Launch", icon: Rocket },
  { href: "/connections", label: "Apps", icon: PlugZap },
  { href: "/commerce", label: "Commerce", icon: ShoppingBag },
  { href: "/vault", label: "Vault", icon: LockKeyhole },
  { href: "/gallery", label: "Gallery", icon: Images },
  { href: "/cultural-map", label: "Map", icon: Compass },
  { href: "/critic", label: "Critic", icon: Siren },
  { href: "/agents", label: "Agents", icon: Cpu },
  { href: "/archive", label: "Archive", icon: Archive }
];

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-paper/10 bg-carbon/80 backdrop-blur-xl">
      <div className="atelier-shell flex items-center justify-between gap-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-wire/50 bg-carbon shadow-[0_0_32px_rgba(206,255,0,0.16)]">
            <Image
              src="/art/loomwire-logo.png"
              alt="LOOMWIRE logo"
              fill
              sizes="48px"
              className="object-cover"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black uppercase tracking-[0.24em] text-paper">
              LOOMWIRE
            </span>
            <span className="block text-xs text-bone/70">by CapeChain Labs</span>
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-0.5 xl:flex">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex min-h-10 min-w-0 items-center gap-1 rounded-md border border-transparent px-1.5 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-bone/75 transition hover:border-paper/10 hover:bg-paper/[0.05] hover:text-volt 2xl:gap-2 2xl:px-2.5 2xl:text-xs 2xl:tracking-[0.14em]"
            >
              <Icon size={13} className="shrink-0 2xl:size-[14px]" />
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </nav>

        <Link className="btn btn-primary hidden xl:inline-flex" href="/atelier">
          <Sparkles size={17} />
          Enter
        </Link>
      </div>
      <nav className="atelier-shell grid grid-cols-3 gap-2 border-t border-paper/10 py-2 sm:grid-cols-4 md:grid-cols-6 xl:hidden">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="inline-flex min-h-9 min-w-0 items-center justify-center gap-1.5 rounded-md border border-paper/10 bg-paper/[0.04] px-2 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-bone/80"
          >
            <Icon size={13} className="shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
