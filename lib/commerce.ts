import type { BrandSystem } from "@/lib/loomwire";

export type CommerceVariant = {
  option1: string;
  sku: string;
  price: string;
  inventoryQuantity: number;
};

export type ShopifyProductInput = {
  title: string;
  handle: string;
  vendor: string;
  productType: string;
  descriptionHtml: string;
  status: "DRAFT";
  tags: string[];
  seo: {
    title: string;
    description: string;
  };
};

export type CommerceKit = {
  platform: "shopify";
  sourceBrandName: string;
  productTitle: string;
  handle: string;
  vendor: string;
  productType: string;
  descriptionHtml: string;
  tags: string[];
  variants: CommerceVariant[];
  launchCopy: string[];
  checklist: string[];
  shopifyProduct: ShopifyProductInput;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function unique(values: string[]) {
  return Array.from(
    new Set(values.map((item) => item.trim()).filter((item) => item.length > 0))
  );
}

function inferBasePrice(priceLogic: string) {
  const explicitPrice = priceLogic.match(/(?:\$|usd\s*)?(\d{2,4})(?:\.\d{2})?/i);
  const value = explicitPrice ? Number(explicitPrice[1]) : 120;
  return Number.isFinite(value) ? value.toFixed(2) : "120.00";
}

function inferProductType(blank: string) {
  const lower = blank.toLowerCase();

  if (/(hoodie|shirt|cap|jacket|clothing|streetwear|apparel)/.test(lower)) {
    return "Apparel";
  }

  if (/(book|magazine|zine|print)/.test(lower)) {
    return "Publication";
  }

  if (/(pass|membership|nft|digital|ai tool|website)/.test(lower)) {
    return "Digital product";
  }

  if (/(event|ticket|experience)/.test(lower)) {
    return "Experience";
  }

  return "Cultural product";
}

function buildVariants(blank: string, price: string, handle: string): CommerceVariant[] {
  const lower = blank.toLowerCase();
  const isSized = /(hoodie|shirt|tee|cap|jacket|clothing|apparel)/.test(lower);
  const values = isSized ? ["S", "M", "L", "XL"] : ["First Edition"];

  return values.map((value) => ({
    option1: value,
    sku: `${handle}-${value}`.toUpperCase().replace(/[^A-Z0-9]+/g, "-"),
    price,
    inventoryQuantity: value === "First Edition" ? 50 : 25
  }));
}

export function buildCommerceKit(system: BrandSystem): CommerceKit {
  const primaryName = system.nameOptions[0]?.name || "LOOMWIRE Brand";
  const productTitle = system.productDrop.name || `${primaryName} DROP 001`;
  const handle = slugify(productTitle) || "loomwire-drop-001";
  const productType = inferProductType(system.productDrop.blank);
  const basePrice = inferBasePrice(system.productDrop.priceLogic);
  const tags = unique([
    "LOOMWIRE",
    "DROP 001",
    productType,
    primaryName,
    ...system.culturalMap.slice(0, 6)
  ]);
  const descriptionHtml = [
    `<h2>${escapeHtml(productTitle)}</h2>`,
    `<p>${escapeHtml(system.manifesto)}</p>`,
    `<h3>The blank</h3>`,
    `<p>${escapeHtml(system.productDrop.blank)}</p>`,
    `<h3>Drop details</h3>`,
    `<ul>${system.productDrop.details
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("")}</ul>`,
    `<p><strong>Price logic:</strong> ${escapeHtml(system.productDrop.priceLogic)}</p>`
  ].join("");

  const seoDescription = system.socialBio.slice(0, 300);
  const shopifyProduct: ShopifyProductInput = {
    title: productTitle,
    handle,
    vendor: primaryName,
    productType,
    descriptionHtml,
    status: "DRAFT",
    tags,
    seo: {
      title: `${productTitle} | ${primaryName}`,
      description: seoDescription
    }
  };

  return {
    platform: "shopify",
    sourceBrandName: primaryName,
    productTitle,
    handle,
    vendor: primaryName,
    productType,
    descriptionHtml,
    tags,
    variants: buildVariants(system.productDrop.blank, basePrice, handle),
    launchCopy: [
      system.websiteHero.headline,
      system.websiteHero.subcopy,
      system.socialBio
    ],
    checklist: [
      "Create this as a draft product first, then review images, variants, shipping, taxes, and inventory in Shopify.",
      "Upload product images or campaign artwork from the Studio before publishing.",
      "Attach the Creator Proof Vault evidence pack to your launch folder.",
      "Keep the first product unpublished until name, IP, and domain checks are complete."
    ],
    shopifyProduct
  };
}
