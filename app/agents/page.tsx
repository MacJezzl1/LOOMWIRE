import {
  Brain,
  Eye,
  GalleryVerticalEnd,
  Microscope,
  Package,
  ShieldCheck,
  TriangleAlert
} from "lucide-react";

const agents = [
  {
    name: "The Researcher",
    icon: Microscope,
    text: "Studies market, culture, competitors, audience, and naming direction."
  },
  {
    name: "The Name Architect",
    icon: Brain,
    text: "Creates meaningful brand names with logic, story, and long-term memory."
  },
  {
    name: "The IP Guard",
    icon: ShieldCheck,
    text: "Prepares risk notes, checklists, creator records, and evidence packs."
  },
  {
    name: "The Art Director",
    icon: GalleryVerticalEnd,
    text: "Builds visual identity, moodboards, website concepts, and campaign language."
  },
  {
    name: "The Product Strategist",
    icon: Package,
    text: "Chooses blanks, product strategy, pricing, launch rhythm, and supplier notes."
  },
  {
    name: "The Lookbook Editor",
    icon: Eye,
    text: "Turns the brand into a cinematic digital lookbook and pitch object."
  },
  {
    name: "The Red-Team Agent",
    icon: TriangleAlert,
    text: "Challenges generic names, unclear audiences, copied visuals, and weak positioning."
  }
];

export const metadata = {
  title: "Agents | LOOMWIRE"
};

export default function AgentsPage() {
  return (
    <main className="min-h-screen">
      <section className="grid-band border-b border-paper/10 py-16">
        <div className="atelier-shell">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
            Multi-Agent System
          </p>
          <h1 className="editorial-heading mt-3 max-w-5xl text-5xl leading-none text-paper sm:text-7xl">
            Seven agents around one cultural system.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-bone">
            LOOMWIRE gives every creative decision a specialist: research,
            naming, protection, art direction, products, lookbooks, and critique.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="atelier-shell grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agents.map(({ name, icon: Icon, text }) => (
            <article key={name} className="paper-panel min-h-[230px] p-5">
              <Icon className="text-wire" size={26} />
              <h2 className="mt-8 text-lg font-black uppercase tracking-[0.14em] text-paper">
                {name}
              </h2>
              <p className="mt-4 text-sm leading-7 text-bone">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
