export type Room = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  headline: string;
  intro: string;
  thesis: string;
  outputs: string[];
  instruments: string[];
  agent: string;
  critic: string;
  cta: string;
};

export const rooms: Room[] = [
  {
    slug: "name-room",
    number: "01",
    title: "The Name Room",
    shortTitle: "Name",
    eyebrow: "Logic before logo",
    headline: "The name is the first product.",
    intro:
      "Build the why behind the word: enemy, world, feeling, culture, meaning, and memory.",
    thesis:
      "A strong name does not decorate the brand. It tells the system what it is allowed to become.",
    outputs: [
      "Name shortlist with meanings and rejection notes.",
      "Founder manifesto and ten-year meaning.",
      "Slogan bank, tone language, and positioning line.",
      "Red-team notes for generic, copied, or weak names."
    ],
    instruments: [
      "Name Architect",
      "Cultural memory map",
      "Similarity risk notes",
      "Meaning stress test"
    ],
    agent: "Name Architect",
    critic:
      "If the name only sounds cool for one season, it is not ready for a decade.",
    cta: "Enter the Name Room"
  },
  {
    slug: "ip-room",
    number: "02",
    title: "The IP Room",
    shortTitle: "IP",
    eyebrow: "Protection preparation",
    headline: "Protect the idea before the world touches it.",
    intro:
      "Prepare trademark research, ownership notes, source files, creator records, and proof timelines.",
    thesis:
      "This room is not legal advice. It is disciplined founder preparation for real counsel and real ownership records.",
    outputs: [
      "Trademark class preparation and conflict research notes.",
      "Domain, handle, marketplace, and name-availability checklist.",
      "Logo ownership file and contributor/license record.",
      "Brand Evidence Pack export."
    ],
    instruments: [
      "IP Guard",
      "Evidence checklist",
      "Ownership timeline",
      "Launch risk board"
    ],
    agent: "IP Guard",
    critic:
      "If you cannot prove when the work appeared, the archive is still too soft.",
    cta: "Prepare IP Room"
  },
  {
    slug: "studio",
    number: "03",
    title: "The Studio",
    shortTitle: "Studio",
    eyebrow: "Art direction",
    headline: "Artwork is part of the product.",
    intro:
      "Turn a brand system into moodboards, color systems, typography direction, posters, mockups, and campaign visuals.",
    thesis:
      "LOOMWIRE treats the visual system like a museum wall and a launch machine at the same time.",
    outputs: [
      "Moodboard and campaign image directions.",
      "Typography, color, poster, and packaging language.",
      "Logo prompts and visual identity prompts.",
      "Website hero and social template concepts."
    ],
    instruments: [
      "Art Director",
      "Poster wall",
      "Palette table",
      "Campaign prompt set"
    ],
    agent: "Art Director",
    critic:
      "If the art direction could fit any brand, the world is not specific enough.",
    cta: "Open the Studio"
  },
  {
    slug: "blank-room",
    number: "04",
    title: "The Blank Room",
    shortTitle: "Blank",
    eyebrow: "First product surface",
    headline: "Every brand needs a blank.",
    intro:
      "Choose the first surface where the system lives: clothing, book, AI tool, digital pass, event, music rollout, or service.",
    thesis:
      "The blank is the first proof that the idea can leave the document and enter culture.",
    outputs: [
      "Blank recommendation with why-now logic.",
      "Drop materials, margin, and supplier checklist.",
      "Bundle, scarcity, and community-access strategy.",
      "First product story and price logic."
    ],
    instruments: [
      "Product Strategist",
      "Drop calculator",
      "Supplier checklist",
      "Blank matrix"
    ],
    agent: "Product Strategist",
    critic:
      "A blank without a reason is merch. A blank with a world is a product.",
    cta: "Choose the Blank"
  },
  {
    slug: "lookbook-engine",
    number: "05",
    title: "The Lookbook Engine",
    shortTitle: "Lookbook",
    eyebrow: "Pitch deck replacement",
    headline: "The lookbook is the new pitch deck.",
    intro:
      "Package the name, story, product, visuals, launch plan, proof record, and shop into a living cultural document.",
    thesis:
      "A beautiful lookbook can sell to customers, explain to investors, and prove seriousness to collaborators.",
    outputs: [
      "Cover, world, blank, proof, and drop sequence.",
      "Shoppable launch page outline.",
      "Investor and grant-friendly sections.",
      "Founder manifesto and campaign copy."
    ],
    instruments: [
      "Lookbook Editor",
      "Page sequence",
      "Launch copy",
      "Export pack"
    ],
    agent: "Lookbook Editor",
    critic:
      "If the lookbook only looks good and does not explain the system, it is still unfinished.",
    cta: "Build the Lookbook"
  },
  {
    slug: "drop-room",
    number: "06",
    title: "The Drop Room",
    shortTitle: "Drop",
    eyebrow: "Release strategy",
    headline: "Release the drop with proof, price, and rhythm.",
    intro:
      "Plan the launch window, price, audience, waitlist, content calendar, product story, and community entry point.",
    thesis:
      "A drop is not just a launch day. It is an arranged sequence of trust, proof, desire, and delivery.",
    outputs: [
      "Launch calendar and audience sequence.",
      "Waitlist page copy and offer stack.",
      "Pricing, scarcity, and fulfillment notes.",
      "Community and post-drop archive plan."
    ],
    instruments: [
      "Launch strategist",
      "Content calendar",
      "Pricing logic",
      "Community pass"
    ],
    agent: "Product Strategist",
    critic:
      "If the audience does not know why now, the drop will feel like noise.",
    cta: "Plan the Drop"
  }
];

export function getRoom(slug: string) {
  return rooms.find((room) => room.slug === slug);
}
