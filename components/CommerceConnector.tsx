"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  KeyRound,
  PackagePlus,
  RefreshCcw,
  Server,
  ShieldCheck,
  ShoppingBag,
  Store,
  TriangleAlert
} from "lucide-react";
import { SaveToVaultButton } from "@/components/SaveToVaultButton";
import { buildCommerceKit, type CommerceKit } from "@/lib/commerce";
import {
  BrandBrief,
  BrandSystem,
  generateLocalBrandSystem
} from "@/lib/loomwire";

const defaultBrief: BrandBrief = {
  idea: "A luxury streetwear brand inspired by African futurism and AI culture.",
  industry: "fashion, AI culture, creator tools",
  audience: "young founders, artists, designers, musicians, and culture builders",
  style: "luxury tech, street-art archive, black gallery, warm yellow, acid green",
  target: "global with African cultural intelligence",
  productType: "hoodie, AI tool, digital community pass, and launch website",
  mood: "intelligent, rebellious, cinematic, protective",
  priceLevel: "premium but reachable",
  vision: "to become a protected cultural system for unknown creators with big ideas"
};

type ShopifyResponse = {
  ok: boolean;
  message?: string;
  apiVersion?: string;
  shop?: {
    name?: string;
    myshopifyDomain?: string;
    primaryDomain?: { url?: string };
  };
  product?: {
    id?: string;
    title?: string;
    handle?: string;
    status?: string;
  };
  adminUrl?: string;
  errors?: { message: string }[];
};

const inputClass = "field px-3 py-2.5 text-sm";

function downloadKit(kit: CommerceKit) {
  const blob = new Blob([JSON.stringify(kit, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${kit.handle || "loomwire-commerce-kit"}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function CommerceConnector() {
  const [system, setSystem] = useState<BrandSystem>(() =>
    generateLocalBrandSystem(defaultBrief)
  );
  const [shopDomain, setShopDomain] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [rememberToken, setRememberToken] = useState(false);
  const [message, setMessage] = useState("Commerce kit ready.");
  const [busy, setBusy] = useState<"test" | "draft" | "prepare" | null>(null);
  const [connection, setConnection] = useState<ShopifyResponse["shop"]>(undefined);
  const [createdProduct, setCreatedProduct] =
    useState<ShopifyResponse["product"]>(undefined);
  const [adminUrl, setAdminUrl] = useState<string | undefined>(undefined);

  const kit = useMemo(() => buildCommerceKit(system), [system]);
  const kitJson = useMemo(() => JSON.stringify(kit, null, 2), [kit]);

  useEffect(() => {
    const storedSystem = window.localStorage.getItem("loomwire-latest-brand-system");
    const storedDomain = window.localStorage.getItem("loomwire-shopify-domain");
    const storedToken = window.localStorage.getItem("loomwire-shopify-token");

    if (storedSystem) {
      try {
        setSystem(JSON.parse(storedSystem));
      } catch {
        setMessage("Using demo brand system because the stored system could not load.");
      }
    }

    if (storedDomain) {
      setShopDomain(storedDomain);
    }

    if (storedToken) {
      setAccessToken(storedToken);
      setRememberToken(true);
    }
  }, []);

  function persistCredentials(nextToken = accessToken) {
    if (shopDomain.trim()) {
      window.localStorage.setItem("loomwire-shopify-domain", shopDomain.trim());
    }

    if (rememberToken && nextToken.trim()) {
      window.localStorage.setItem("loomwire-shopify-token", nextToken.trim());
    } else {
      window.localStorage.removeItem("loomwire-shopify-token");
    }
  }

  async function callShopify(action: "prepare" | "test" | "createDraft") {
    setBusy(action === "createDraft" ? "draft" : action);
    setMessage(
      action === "createDraft"
        ? "Creating draft product in Shopify."
        : action === "test"
          ? "Testing Shopify connection."
          : "Preparing Shopify payload."
    );

    try {
      persistCredentials();
      const response = await fetch("/api/shopify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          shopDomain,
          accessToken,
          kit
        })
      });
      const data = (await response.json()) as ShopifyResponse;

      if (!response.ok || !data.ok) {
        throw new Error(
          data.message ||
            data.errors?.map((item) => item.message).join(" ") ||
            "Shopify action failed."
        );
      }

      if (action === "test") {
        setConnection(data.shop);
      }

      if (action === "createDraft") {
        setCreatedProduct(data.product);
        setAdminUrl(data.adminUrl);
      }

      setMessage(data.message || "Shopify action complete.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unknown Shopify connector error."
      );
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
      <section className="paper-panel acid-edge min-w-0 p-4 sm:p-5">
        <div className="mb-5 border-b border-paper/10 pb-4">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
            Commerce Connector
          </p>
          <h2 className="editorial-heading mt-2 text-3xl text-paper sm:text-5xl">
            Turn the drop into a store object.
          </h2>
          <p className="mt-4 text-sm leading-7 text-bone">
            LOOMWIRE converts the latest Atelier system into a Shopify-ready
            draft product, launch copy, tags, SEO, variant notes, and Vault proof.
          </p>
        </div>

        <div className="grid gap-4">
          <label className="block min-w-0">
            <span className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
              <Store size={14} className="text-wire" />
              Shopify store domain
            </span>
            <input
              className={inputClass}
              value={shopDomain}
              placeholder="mystore.myshopify.com"
              onChange={(event) => setShopDomain(event.target.value)}
            />
          </label>

          <label className="block min-w-0">
            <span className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
              <KeyRound size={14} className="text-wire" />
              Admin API access token
            </span>
            <input
              className={inputClass}
              type="password"
              value={accessToken}
              placeholder="shpat_..."
              onChange={(event) => setAccessToken(event.target.value)}
            />
          </label>

          <label className="flex items-start gap-2 text-xs leading-relaxed text-bone/75">
            <input
              type="checkbox"
              checked={rememberToken}
              onChange={(event) => {
                setRememberToken(event.target.checked);
                if (!event.target.checked) {
                  window.localStorage.removeItem("loomwire-shopify-token");
                }
              }}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[#b7ff4a]"
            />
            Remember this store token in this browser only. LOOMWIRE does not
            save Shopify tokens to the Vault or database.
          </label>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => callShopify("prepare")}
            disabled={busy !== null}
          >
            <Server size={18} />
            {busy === "prepare" ? "Preparing" : "Prepare payload"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => callShopify("test")}
            disabled={busy !== null}
          >
            <ShieldCheck size={18} />
            {busy === "test" ? "Testing" : "Test connection"}
          </button>
          <button
            type="button"
            className="btn btn-primary sm:col-span-2"
            onClick={() => callShopify("createDraft")}
            disabled={busy !== null}
          >
            <PackagePlus size={18} />
            {busy === "draft" ? "Creating draft" : "Create draft product"}
          </button>
        </div>

        <div className="mt-4 rounded-md border border-paper/10 bg-paper/[0.035] p-3 text-sm leading-7 text-bone">
          {message}
        </div>

        {connection ? (
          <div className="mt-4 rounded-md border border-wire/30 bg-wire/10 p-3 text-sm leading-7 text-bone">
            <div className="flex items-center gap-2 font-black text-paper">
              <CheckCircle2 size={17} className="text-volt" />
              {connection.name || "Shopify store"} connected
            </div>
            <p className="mt-1 text-bone/75">
              {connection.myshopifyDomain}
              {connection.primaryDomain?.url ? ` | ${connection.primaryDomain.url}` : ""}
            </p>
          </div>
        ) : null}

        {createdProduct ? (
          <div className="mt-4 rounded-md border border-volt/40 bg-volt/10 p-3 text-sm leading-7 text-bone">
            <div className="flex items-center gap-2 font-black text-paper">
              <ShoppingBag size={17} className="text-volt" />
              Draft created: {createdProduct.title}
            </div>
            <p className="mt-1 text-bone/75">
              Status: {createdProduct.status} | Handle: {createdProduct.handle}
            </p>
            {adminUrl ? (
              <a className="btn btn-ghost mt-3" href={adminUrl} target="_blank">
                <ExternalLink size={18} />
                Open in Shopify
              </a>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="paper-panel min-w-0 p-4 sm:p-5">
        <div className="mb-5 flex min-w-0 flex-col gap-4 border-b border-paper/10 pb-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-wire">
              Drop Kit
            </p>
            <h2 className="editorial-heading mt-2 break-words text-3xl text-paper sm:text-5xl">
              {kit.productTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-bone">
              Draft status, tags, SEO, variants, and launch copy are prepared
              from your most recent Atelier system.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              const storedSystem = window.localStorage.getItem(
                "loomwire-latest-brand-system"
              );
              if (storedSystem) {
                setSystem(JSON.parse(storedSystem));
                setMessage("Commerce kit rebuilt from latest Atelier system.");
              }
            }}
          >
            <RefreshCcw size={18} />
            Rebuild
          </button>
        </div>

        <div className="grid min-w-0 gap-4 xl:grid-cols-2">
          <article className="min-w-0 rounded-md border border-paper/10 bg-paper/[0.035] p-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-volt">
              Shopify Product
            </p>
            <dl className="mt-4 grid gap-3 text-sm leading-6 text-bone">
              <div>
                <dt className="text-bone/55">Handle</dt>
                <dd className="break-all font-bold text-paper">{kit.handle}</dd>
              </div>
              <div>
                <dt className="text-bone/55">Vendor</dt>
                <dd>{kit.vendor}</dd>
              </div>
              <div>
                <dt className="text-bone/55">Product type</dt>
                <dd>{kit.productType}</dd>
              </div>
              <div>
                <dt className="text-bone/55">Tags</dt>
                <dd className="break-words">{kit.tags.join(", ")}</dd>
              </div>
            </dl>
          </article>

          <article className="min-w-0 rounded-md border border-paper/10 bg-paper/[0.035] p-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-volt">
              Variants
            </p>
            <div className="mt-4 grid gap-2">
              {kit.variants.map((variant) => (
                <div
                  key={variant.sku}
                  className="grid min-w-0 grid-cols-[0.7fr_minmax(0,1fr)_0.7fr] gap-2 rounded border border-paper/10 bg-carbon/60 p-2 text-xs text-bone"
                >
                  <span className="min-w-0 font-black text-paper">
                    {variant.option1}
                  </span>
                  <span className="min-w-0 truncate">{variant.sku}</span>
                  <span className="min-w-0">${variant.price}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="min-w-0 rounded-md border border-paper/10 bg-paper/[0.035] p-4 xl:col-span-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-volt">
              Launch Copy
            </p>
            <ul className="mt-4 grid gap-2 text-sm leading-7 text-bone">
              {kit.launchCopy.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-wire" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="min-w-0 rounded-md border border-paper/10 bg-paper/[0.035] p-4 xl:col-span-2">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-volt">
              <TriangleAlert size={15} />
              Publish Checklist
            </p>
            <ul className="mt-4 grid gap-2 text-sm leading-7 text-bone">
              {kit.checklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-volt" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-paper/10 pt-5 sm:flex-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => downloadKit(kit)}
          >
            <Download size={18} />
            Export kit
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              navigator.clipboard.writeText(kitJson);
              setMessage("Copied Shopify commerce kit JSON.");
            }}
          >
            <Copy size={18} />
            Copy JSON
          </button>
          <SaveToVaultButton
            record={{
              title: `${kit.productTitle} commerce kit`,
              category: "Launch proof",
              notes: `Shopify draft kit for ${kit.vendor}. Handle: ${kit.handle}. Tags: ${kit.tags.join(
                ", "
              )}.`
            }}
          />
          <Link className="btn btn-ghost" href="/launch-board">
            <ShoppingBag size={18} />
            Launch Board
          </Link>
        </div>

        <pre className="mt-5 max-h-[420px] min-w-0 max-w-full overflow-auto rounded-md border border-paper/10 bg-carbon/70 p-4 text-xs leading-6 text-bone">
          {kitJson}
        </pre>
      </section>
    </div>
  );
}
