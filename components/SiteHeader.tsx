import Link from "next/link";
import {
  Archive,
  Compass,
  Cpu,
  DoorOpen,
  Images,
  LockKeyhole,
  Siren,
  Sparkles
} from "lucide-react";

const navItems = [
  { href: "/atelier", label: "Atelier", icon: Sparkles },
  { href: "/rooms", label: "Rooms", icon: DoorOpen },
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
          <span className="grid h-10 w-10 place-items-center rounded-md border border-wire/50 bg-wire/10 text-sm font-black text-volt">
            LW
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black uppercase tracking-[0.24em] text-paper">
              LOOMWIRE
            </span>
            <span className="block text-xs text-bone/70">by CapeChain Labs</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent px-3 text-xs font-bold uppercase tracking-[0.18em] text-bone/75 transition hover:border-paper/10 hover:bg-paper/[0.05] hover:text-volt"
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </nav>

        <Link className="btn btn-primary hidden sm:inline-flex" href="/atelier">
          <Sparkles size={17} />
          Enter
        </Link>
      </div>
      <nav className="atelier-shell flex gap-2 overflow-x-auto border-t border-paper/10 py-2 lg:hidden">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-md border border-paper/10 bg-paper/[0.04] px-3 text-xs font-bold uppercase tracking-[0.16em] text-bone/80"
          >
            <Icon size={13} />
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
