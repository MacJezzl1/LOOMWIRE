export type Provider =
  | "demo"
  | "openai"
  | "anthropic"
  | "openrouter"
  | "groq"
  | "ollama";

export type BrandBrief = {
  idea: string;
  industry: string;
  audience: string;
  style: string;
  target: string;
  productType: string;
  mood: string;
  priceLevel: string;
  vision: string;
};

export type NameOption = {
  name: string;
  meaning: string;
  slogan: string;
  risk: string;
};

export type PaletteSwatch = {
  name: string;
  hex: string;
  usage: string;
};

export type BrandSystem = {
  nameOptions: NameOption[];
  manifesto: string;
  positioning: string[];
  palette: PaletteSwatch[];
  logoPrompt: string;
  websiteHero: {
    headline: string;
    subcopy: string;
    primaryCta: string;
  };
  launchPlan: string[];
  ipChecklist: string[];
  evidencePack: string[];
  lookbookOutline: string[];
  productDrop: {
    name: string;
    blank: string;
    priceLogic: string;
    details: string[];
  };
  socialBio: string;
  dnaScore: {
    total: number;
    nameStrength: number;
    storyDepth: number;
    visualDirection: number;
    marketDifference: number;
    ipReadiness: number;
    launchReadiness: number;
  };
  culturalMap: string[];
  agentNotes: {
    researcher: string;
    nameArchitect: string;
    ipGuard: string;
    artDirector: string;
    productStrategist: string;
    lookbookEditor: string;
    redTeam: string;
  };
  source?: string;
};

const cultureTokens = [
  "streetwear",
  "afrofuturism",
  "music",
  "luxury",
  "technology",
  "architecture",
  "gaming",
  "blockchain",
  "poetry",
  "youth culture",
  "founder culture",
  "visual art"
];

function clean(value: string | undefined, fallback: string) {
  const normalized = value?.trim().replace(/\s+/g, " ");
  return normalized && normalized.length > 0 ? normalized : fallback;
}

function titleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function compactName(seed: string) {
  const words = seed
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, 3);

  if (words.length === 0) {
    return "Vanta";
  }

  return words
    .map((word, index) =>
      index === 0
        ? word.slice(0, Math.min(5, word.length))
        : word.slice(0, Math.min(4, word.length))
    )
    .join("");
}

function scoreFromText(...parts: string[]) {
  const lengthScore = Math.min(100, Math.max(54, parts.join(" ").length / 3));
  const depthScore =
    parts.filter((part) => part.split(/\s+/).length > 4).length * 7 + 58;
  return Math.round(Math.min(96, (lengthScore + depthScore) / 2));
}

export function generateLocalBrandSystem(brief: BrandBrief): BrandSystem {
  const idea = clean(
    brief.idea,
    "a luxury streetwear brand inspired by African futurism and AI culture"
  );
  const industry = clean(brief.industry, "fashion, technology, and culture");
  const audience = clean(
    brief.audience,
    "artists, founders, designers, musicians, and culture builders"
  );
  const style = clean(brief.style, "luxury tech with street-art archive energy");
  const target = clean(brief.target, "global");
  const productType = clean(brief.productType, "hoodie, digital pass, and launch site");
  const mood = clean(brief.mood, "intelligent, rare, grounded, cinematic");
  const priceLevel = clean(brief.priceLevel, "premium but reachable");
  const vision = clean(
    brief.vision,
    "to become a protected cultural system with products, media, and community"
  );

  const seed = compactName(`${idea} ${industry}`);
  const concept = titleCase(industry.split(/[,+/&]/)[0] || "Culture");
  const nameOne = `${seed.toUpperCase()} WIRE`;
  const nameTwo = `${concept.replace(/\s/g, "")} Archive`;
  const nameThree = `Blank ${seed.slice(0, 5).toUpperCase()}`;
  const total = scoreFromText(idea, audience, style, vision);

  return {
    source: "LOOMWIRE local demo engine",
    nameOptions: [
      {
        name: nameOne,
        meaning: `A signal name: ${seed.toUpperCase()} holds the raw idea, WIRE suggests the system that connects culture, product, and ownership.`,
        slogan: "Make the signal visible.",
        risk:
          "Run exact-match trademark, domain, and handle checks. Stronger if the first word is uncommon in your category."
      },
      {
        name: nameTwo,
        meaning: `A museum-minded name for a ${target} brand that treats every product, drop, and campaign as a saved cultural artifact.`,
        slogan: "Every release becomes evidence.",
        risk:
          "Archive language is crowded. Pair it with a distinctive visual mark and a specific product world."
      },
      {
        name: nameThree,
        meaning: `Built around the blank: the first surface where the brand lives, from ${productType} to media, tools, events, and community.`,
        slogan: "Choose the blank. Build the world.",
        risk:
          "Conceptual names need sharp copy and repeated use so the audience understands the logic quickly."
      }
    ],
    manifesto: `This brand exists for ${audience}. It turns ${idea} into a visible system: a name with logic, a product with purpose, and an archive that proves the work happened. It is not decoration. It is a world built against forgettable culture and shallow launches. In ten years, it should still mean discipline, memory, ownership, and a new way for ${target} creators to release ideas without losing the story.`,
    positioning: [
      `Category: ${industry}, expressed as cultural infrastructure rather than a single product.`,
      `Audience: ${audience}, especially people who need brand logic before they need more content.`,
      `Difference: ${style} with a practical path from name to IP pack to lookbook to revenue.`,
      `Promise: raw idea to protected cultural system.`
    ],
    palette: [
      {
        name: "Carbon Room",
        hex: "#070705",
        usage: "Primary atmosphere, gallery void, and premium contrast."
      },
      {
        name: "Evidence Paper",
        hex: "#f4efe4",
        usage: "Manifesto text, lookbook pages, and document surfaces."
      },
      {
        name: "Wire Gold",
        hex: "#d4a935",
        usage: "Important marks, ownership highlights, and CTA edges."
      },
      {
        name: "Signal Green",
        hex: "#b7ff4a",
        usage: "Street-poster accents, scoring moments, and active states."
      },
      {
        name: "Safety Orange",
        hex: "#ff6b35",
        usage: "Red-team warnings, launch energy, and drop tags."
      }
    ],
    logoPrompt: `Create a vector-friendly wordmark for "${nameOne}" with black-box luxury, street poster grid logic, thin wire lines, and one memorable mark that can stamp evidence packs. Avoid mascots, generic crowns, stock monograms, and overused tech gradients.`,
    websiteHero: {
      headline: "BUILD THE NAME. PROTECT THE IDEA. DESIGN THE WORLD. RELEASE THE DROP.",
      subcopy: `An AI-powered brand operating system for ${audience} turning ${idea} into protected, visual, sellable worlds.`,
      primaryCta: "Enter the Atelier"
    },
    launchPlan: [
      "Name room: choose one name, one enemy, one world, and one ten-year meaning.",
      "Evidence room: timestamp the brief, logo direction, product concept, and first lookbook draft.",
      "Studio room: produce a moodboard, palette, logo prompt, poster direction, and website hero.",
      "Blank room: select the first product surface and make one limited drop with a clear reason to exist.",
      "Drop room: release a 10-day content calendar, waitlist page, launch price, and founder manifesto."
    ],
    ipChecklist: [
      "Search exact and similar marks in the main target country and global priority markets.",
      "Check domain, social handles, and marketplace conflicts before public launch.",
      "Save source files, prompts, sketches, exports, and authorship notes in a dated evidence folder.",
      "Keep logo ownership records, contributor agreements, and asset licenses together.",
      "Prepare trademark classes, product categories, and first-use notes for a qualified IP professional."
    ],
    evidencePack: [
      "Idea summary with date, author, market, audience, and long-term vision.",
      "Name shortlist with meanings, rejection notes, and final selection rationale.",
      "Logo/art direction record with prompts, drafts, exported files, and creator notes.",
      "Product blank sheet with materials, mockups, supplier research, and pricing logic.",
      "Lookbook export, launch page screenshot, social bio, and first campaign calendar."
    ],
    lookbookOutline: [
      "Cover: brand name, first drop code, and one manifesto sentence.",
      "The World: what the brand is building against and what it invites people into.",
      "The Blank: product surface, material story, and why this item comes first.",
      "The Proof: ownership timeline, design evidence, and IP preparation checklist.",
      "The Drop: product images, price logic, content calendar, and community entry point."
    ],
    productDrop: {
      name: `${nameOne} DROP 001: THE FIRST BLANK`,
      blank: productType,
      priceLogic: `${priceLevel}: price the first drop for margin, scarcity, and trust rather than hype alone.`,
      details: [
        `Design language: ${mood}.`,
        "Quantity: small enough to feel intentional, large enough to test demand.",
        "Bundle: product, numbered evidence card, lookbook page, and community access.",
        "Launch mechanic: waitlist first, then a timed release with founder notes."
      ]
    },
    socialBio: `${nameOne} turns ${idea} into protected cultural products. Name, IP, studio, blank, lookbook, drop. Built for ${target} creators.`,
    dnaScore: {
      total,
      nameStrength: Math.min(96, total + 2),
      storyDepth: Math.min(98, total + 5),
      visualDirection: Math.min(94, total + 1),
      marketDifference: Math.max(62, total - 4),
      ipReadiness: Math.max(58, total - 9),
      launchReadiness: Math.max(60, total - 6)
    },
    culturalMap: cultureTokens
      .filter((token) =>
        `${idea} ${industry} ${style} ${vision}`.toLowerCase().includes(token)
      )
      .concat(["creator ownership", "lookbook commerce"])
      .slice(0, 8),
    agentNotes: {
      researcher: `The strongest market angle is ${style} for ${audience}, not a generic AI brand builder.`,
      nameArchitect: `${nameOne} works because it turns the name into infrastructure, not ornament.`,
      ipGuard:
        "This is not legal advice. Treat the pack as organized preparation for trademark counsel and founder records.",
      artDirector:
        "Use black gallery space, paper texture, signal green, warm yellow, and documentary product images.",
      productStrategist: `Start with ${productType}, then turn the lookbook into the pitch, shop, and community page.`,
      lookbookEditor:
        "The lookbook should read like a campaign artifact and a funding memo at the same time.",
      redTeam:
        "The idea is strong. The danger is sounding like software while claiming culture. Keep the copy poetic but make the outputs concrete."
    }
  };
}

export function buildAiPrompt(brief: BrandBrief) {
  return `You are LOOMWIRE, a premium AI brand operating system for culture builders.

Create a complete brand system from this brief:
${JSON.stringify(brief, null, 2)}

Return strict JSON matching this TypeScript shape:
{
  "nameOptions": [{"name": string, "meaning": string, "slogan": string, "risk": string}],
  "manifesto": string,
  "positioning": string[],
  "palette": [{"name": string, "hex": string, "usage": string}],
  "logoPrompt": string,
  "websiteHero": {"headline": string, "subcopy": string, "primaryCta": string},
  "launchPlan": string[],
  "ipChecklist": string[],
  "evidencePack": string[],
  "lookbookOutline": string[],
  "productDrop": {"name": string, "blank": string, "priceLogic": string, "details": string[]},
  "socialBio": string,
  "dnaScore": {"total": number, "nameStrength": number, "storyDepth": number, "visualDirection": number, "marketDifference": number, "ipReadiness": number, "launchReadiness": number},
  "culturalMap": string[],
  "agentNotes": {"researcher": string, "nameArchitect": string, "ipGuard": string, "artDirector": string, "productStrategist": string, "lookbookEditor": string, "redTeam": string}
}

Rules:
- No legal advice; IP content is preparation and checklist language only.
- Make it global, practical, artful, and commerce-ready.
- Avoid generic startup language.
- Keep every array to 3-6 strong items.
- Use ASCII characters only.`;
}

export function coerceBrandSystem(value: unknown, brief: BrandBrief): BrandSystem {
  if (!value || typeof value !== "object") {
    return generateLocalBrandSystem(brief);
  }

  const fallback = generateLocalBrandSystem(brief);
  const candidate = value as Partial<BrandSystem>;

  return {
    ...fallback,
    ...candidate,
    websiteHero: {
      ...fallback.websiteHero,
      ...(candidate.websiteHero ?? {})
    },
    productDrop: {
      ...fallback.productDrop,
      ...(candidate.productDrop ?? {})
    },
    dnaScore: {
      ...fallback.dnaScore,
      ...(candidate.dnaScore ?? {})
    },
    agentNotes: {
      ...fallback.agentNotes,
      ...(candidate.agentNotes ?? {})
    }
  };
}
