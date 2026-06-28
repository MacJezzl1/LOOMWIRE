import type { CommerceKit, ShopifyProductInput } from "@/lib/commerce";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SHOPIFY_API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || "2026-04";
const SHOPIFY_TIMEOUT_MS = 30000;

type ShopifyRequest = {
  action?: "prepare" | "test" | "createDraft";
  shopDomain?: string;
  accessToken?: string;
  kit?: CommerceKit;
};

const TEST_QUERY = /* GraphQL */ `
  query LoomwireShopStatus {
    shop {
      name
      myshopifyDomain
      primaryDomain {
        url
      }
    }
  }
`;

const CREATE_PRODUCT_MUTATION = /* GraphQL */ `
  mutation LoomwireCreateProduct($product: ProductCreateInput!) {
    productCreate(product: $product) {
      product {
        id
        title
        handle
        status
      }
      userErrors {
        field
        message
      }
    }
  }
`;

function normalizeShopDomain(value: string | undefined) {
  const cleaned = (value || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");

  const host = cleaned.endsWith(".myshopify.com")
    ? cleaned
    : `${cleaned}.myshopify.com`;

  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(host)) {
    throw new Error("Enter a valid Shopify store domain, like mystore.myshopify.com.");
  }

  return host;
}

function requireAccessToken(value: string | undefined) {
  const token = value?.trim();

  if (!token) {
    throw new Error("Enter a Shopify Admin API access token.");
  }

  return token;
}

function cleanString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function productInputFromKit(kit: CommerceKit | undefined): ShopifyProductInput {
  if (!kit?.shopifyProduct) {
    throw new Error("Missing LOOMWIRE commerce kit.");
  }

  const product = kit.shopifyProduct;
  const tags = Array.isArray(product.tags)
    ? product.tags.filter((tag) => typeof tag === "string" && tag.trim().length > 0)
    : [];

  return {
    title: cleanString(product.title, kit.productTitle || "LOOMWIRE DROP 001"),
    handle: cleanString(product.handle, kit.handle || "loomwire-drop-001"),
    vendor: cleanString(product.vendor, kit.vendor || "LOOMWIRE"),
    productType: cleanString(product.productType, kit.productType || "Cultural product"),
    descriptionHtml: cleanString(product.descriptionHtml, kit.descriptionHtml || ""),
    status: "DRAFT",
    tags,
    seo: {
      title: cleanString(product.seo?.title, product.title),
      description: cleanString(product.seo?.description, kit.launchCopy?.[2] || "")
    }
  };
}

async function fetchWithTimeout(url: string, options: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SHOPIFY_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Shopify request timed out.");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function shopifyGraphql<T>(
  shopDomain: string,
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>
) {
  const response = await fetchWithTimeout(
    `https://${shopDomain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken
      },
      body: JSON.stringify({ query, variables })
    }
  );

  const text = await response.text();
  let payload: T & { errors?: { message?: string }[] };

  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error(`Shopify returned a non-JSON response with ${response.status}.`);
  }

  if (!response.ok) {
    throw new Error(
      payload.errors?.[0]?.message ||
        `Shopify Admin API returned ${response.status}.`
    );
  }

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((item) => item.message).join(" "));
  }

  return payload;
}

function adminProductUrl(shopDomain: string, productId?: string) {
  const numericId = productId?.split("/").pop();

  return numericId ? `https://${shopDomain}/admin/products/${numericId}` : undefined;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ShopifyRequest;
    const action = body.action || "prepare";

    if (action === "prepare") {
      return Response.json({
        ok: true,
        apiVersion: SHOPIFY_API_VERSION,
        product: productInputFromKit(body.kit),
        message: "Shopify draft product payload prepared."
      });
    }

    const shopDomain = normalizeShopDomain(body.shopDomain);
    const accessToken = requireAccessToken(body.accessToken);

    if (action === "test") {
      const payload = await shopifyGraphql<{
        data?: {
          shop?: {
            name: string;
            myshopifyDomain: string;
            primaryDomain?: { url?: string };
          };
        };
      }>(shopDomain, accessToken, TEST_QUERY);

      return Response.json({
        ok: true,
        apiVersion: SHOPIFY_API_VERSION,
        shop: payload.data?.shop,
        message: "Shopify connection verified."
      });
    }

    if (action === "createDraft") {
      const product = productInputFromKit(body.kit);
      const payload = await shopifyGraphql<{
        data?: {
          productCreate?: {
            product?: {
              id: string;
              title: string;
              handle: string;
              status: string;
            };
            userErrors?: { field?: string[]; message: string }[];
          };
        };
      }>(shopDomain, accessToken, CREATE_PRODUCT_MUTATION, { product });

      const result = payload.data?.productCreate;
      const userErrors = result?.userErrors || [];

      if (userErrors.length > 0) {
        return Response.json(
          {
            ok: false,
            apiVersion: SHOPIFY_API_VERSION,
            errors: userErrors,
            message: userErrors.map((item) => item.message).join(" ")
          },
          { status: 422 }
        );
      }

      return Response.json({
        ok: true,
        apiVersion: SHOPIFY_API_VERSION,
        product: result?.product,
        adminUrl: adminProductUrl(shopDomain, result?.product?.id),
        message: "Draft Shopify product created."
      });
    }

    return Response.json({ ok: false, message: "Unknown Shopify action." }, { status: 400 });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Unknown Shopify error."
      },
      { status: 400 }
    );
  }
}
