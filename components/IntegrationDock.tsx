"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Archive,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  KeyRound,
  PlugZap,
  Save,
  Search,
  ShieldCheck,
  Sparkles,
  TriangleAlert
} from "lucide-react";
import { SaveToVaultButton } from "@/components/SaveToVaultButton";
import {
  IntegrationApp,
  IntegrationCategory,
  IntegrationKit,
  credentialSummary,
  integrationApps
} from "@/lib/integrations";

type ConnectedRecord = {
  appId: string;
  appName: string;
  connectedAt: string;
};

type ApiResponse = {
  ok: boolean;
  kit?: IntegrationKit;
  credentialStatus?: ReturnType<typeof credentialSummary>;
  message?: string;
};

const categories: ("All" | IntegrationCategory)[] = [
  "All",
  "Commerce",
  "Payments",
  "Production",
  "Storage",
  "Content",
  "Community",
  "Automation",
  "Launch"
];

const inputClass = "field px-3 py-2.5 text-sm";

function downloadJson(filename: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function IntegrationDock() {
  const [selectedId, setSelectedId] = useState("shopify");
  const [category, setCategory] = useState<"All" | IntegrationCategory>("All");
  const [query, setQuery] = useState("");
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [kit, setKit] = useState<IntegrationKit | undefined>(undefined);
  const [message, setMessage] = useState("Choose an app and prepare a connection kit.");
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState<Record<string, ConnectedRecord>>({});

  const selectedApp = useMemo(
    () => integrationApps.find((app) => app.id === selectedId) || integrationApps[0],
    [selectedId]
  );

  const status = useMemo(
    () => credentialSummary(selectedApp.id, credentials),
    [credentials, selectedApp.id]
  );

  const filteredApps = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return integrationApps.filter((app) => {
      const matchesCategory = category === "All" || app.category === category;
      const matchesQuery =
        needle.length === 0 ||
        `${app.name} ${app.category} ${app.tagline} ${app.bestFor.join(" ")}`
          .toLowerCase()
          .includes(needle);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const kitJson = useMemo(() => JSON.stringify(kit, null, 2), [kit]);

  useEffect(() => {
    const stored = window.localStorage.getItem("loomwire-connected-apps");

    if (stored) {
      try {
        setConnected(JSON.parse(stored));
      } catch {
        setConnected({});
      }
    }
  }, []);

  useEffect(() => {
    setCredentials({});
    setKit(undefined);
    setMessage(`${selectedApp.name} selected. Prepare a kit or open its docs.`);
  }, [selectedApp]);

  async function prepareKit() {
    setLoading(true);
    setMessage(`Preparing ${selectedApp.name} connection kit.`);

    try {
      const response = await fetch("/api/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "prepare",
          appId: selectedApp.id,
          credentials
        })
      });
      const data = (await response.json()) as ApiResponse;

      if (!response.ok || !data.ok || !data.kit) {
        throw new Error(data.message || "Could not prepare connection kit.");
      }

      setKit(data.kit);
      setMessage(
        data.credentialStatus?.ready
          ? `${selectedApp.name} kit ready. Required fields are present.`
          : `${selectedApp.name} kit ready. Missing: ${
              data.credentialStatus?.missing.join(", ") || "optional fields"
            }.`
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unknown connection-kit error."
      );
    } finally {
      setLoading(false);
    }
  }

  function markConnected() {
    const next = {
      ...connected,
      [selectedApp.id]: {
        appId: selectedApp.id,
        appName: selectedApp.name,
        connectedAt: new Date().toISOString()
      }
    };

    setConnected(next);
    window.localStorage.setItem("loomwire-connected-apps", JSON.stringify(next));
    setMessage(`${selectedApp.name} marked as connected in this browser.`);
  }

  return (
    <div className="grid min-w-0 gap-5 lg:grid-cols-[0.82fr_1.18fr]">
      <section className="paper-panel acid-edge min-w-0 p-4 sm:p-5">
        <div className="mb-5 border-b border-paper/10 pb-4">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-volt">
            App Dock
          </p>
          <h2 className="editorial-heading mt-2 text-3xl text-paper sm:text-5xl">
            Connect the tools around the brand.
          </h2>
          <p className="mt-4 text-sm leading-7 text-bone">
            Pick the apps a creator needs, prepare the connection kit, copy the
            env map, save proof, and keep secrets out of the Vault.
          </p>
        </div>

        <label className="block min-w-0">
          <span className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
            <Search size={14} className="text-wire" />
            Search apps
          </span>
          <input
            className={inputClass}
            value={query}
            placeholder="payments, community, storage, print..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`min-h-9 shrink-0 rounded-md border px-3 text-xs font-bold uppercase tracking-[0.14em] transition ${
                category === item
                  ? "border-volt bg-volt/14 text-paper"
                  : "border-paper/10 bg-paper/[0.04] text-bone/75 hover:border-wire/70"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => setSelectedId(app.id)}
              className={`rounded-md border p-3 text-left transition ${
                selectedId === app.id
                  ? "border-volt bg-volt/12"
                  : "border-paper/10 bg-paper/[0.035] hover:border-wire/60"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-black text-paper">{app.name}</h3>
                    {connected[app.id] ? (
                      <span className="rounded border border-volt/40 bg-volt/10 px-2 py-0.5 text-[0.62rem] font-black uppercase tracking-[0.12em] text-volt">
                        Connected
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-bone">{app.tagline}</p>
                </div>
                <span className="shrink-0 rounded border border-paper/10 px-2 py-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-bone/75">
                  {app.status === "live" ? "Live" : "Kit"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="paper-panel min-w-0 p-4 sm:p-5">
        <div className="mb-5 flex min-w-0 flex-col gap-4 border-b border-paper/10 pb-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-wire">
              {selectedApp.category} / {selectedApp.status === "live" ? "Live connector" : "Kit-ready"}
            </p>
            <h2 className="editorial-heading mt-2 break-words text-4xl text-paper sm:text-6xl">
              {selectedApp.name}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-bone">
              {selectedApp.description}
            </p>
          </div>
          <a className="btn btn-ghost" href={selectedApp.docsUrl} target="_blank">
            <ExternalLink size={18} />
            Docs
          </a>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <article className="min-w-0 rounded-md border border-paper/10 bg-paper/[0.035] p-4">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-volt">
              <KeyRound size={15} />
              Connection fields
            </p>
            <div className="mt-4 grid gap-3">
              {selectedApp.fields.length > 0 ? (
                selectedApp.fields.map((field) => (
                  <label key={field.id} className="block min-w-0">
                    <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-bone/70">
                      {field.label}
                      {field.required ? " *" : ""}
                    </span>
                    <input
                      className={inputClass}
                      type={field.secret ? "password" : "text"}
                      value={credentials[field.id] || ""}
                      placeholder={field.placeholder}
                      onChange={(event) =>
                        setCredentials((current) => ({
                          ...current,
                          [field.id]: event.target.value
                        }))
                      }
                    />
                  </label>
                ))
              ) : (
                <p className="text-sm leading-7 text-bone">
                  This integration does not need credentials for the first kit.
                </p>
              )}
            </div>

            <div className="mt-4 rounded-md border border-paper/10 bg-carbon/50 p-3 text-sm leading-7 text-bone">
              {status.ready ? (
                <span className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 text-volt" size={16} />
                  Required fields are present.
                </span>
              ) : (
                <span className="flex items-start gap-2">
                  <TriangleAlert className="mt-1 text-signal" size={16} />
                  Missing required fields: {status.missing.join(", ")}.
                </span>
              )}
            </div>
          </article>

          <article className="min-w-0 rounded-md border border-paper/10 bg-paper/[0.035] p-4">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-volt">
              <PlugZap size={15} />
              What this app helps
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-black text-paper">Best for</h3>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-bone">
                  {selectedApp.bestFor.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-wire" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-black text-paper">Outputs</h3>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-bone">
                  {selectedApp.outputs.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-volt" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={prepareKit}
            disabled={loading}
          >
            <Sparkles size={18} />
            {loading ? "Preparing" : "Prepare kit"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={markConnected}
          >
            <Save size={18} />
            Mark connected
          </button>
          {selectedApp.route ? (
            <Link className="btn btn-ghost" href={selectedApp.route}>
              <ExternalLink size={18} />
              Open connector
            </Link>
          ) : null}
        </div>

        <p className="mt-4 rounded-md border border-paper/10 bg-paper/[0.035] p-3 text-sm leading-7 text-bone">
          {message}
        </p>

        {kit ? (
          <div className="mt-5 grid min-w-0 gap-4">
            <article className="rounded-md border border-wire/30 bg-wire/10 p-4">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-volt">
                <ShieldCheck size={15} />
                Setup steps
              </p>
              <ol className="mt-4 space-y-2 text-sm leading-7 text-bone">
                {kit.setupSteps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-black text-volt">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  downloadJson(`${selectedApp.id}-loomwire-kit.json`, kit)
                }
              >
                <Download size={18} />
                Export kit
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  navigator.clipboard.writeText(kitJson);
                  setMessage(`${selectedApp.name} kit copied.`);
                }}
              >
                <Copy size={18} />
                Copy kit
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  navigator.clipboard.writeText(kit.envTemplate);
                  setMessage(`${selectedApp.name} env template copied.`);
                }}
              >
                <Archive size={18} />
                Copy env
              </button>
              <SaveToVaultButton record={kit.vaultRecord} />
            </div>

            <pre className="max-h-[390px] min-w-0 max-w-full overflow-auto rounded-md border border-paper/10 bg-carbon/70 p-4 text-xs leading-6 text-bone">
              {kitJson}
            </pre>
          </div>
        ) : null}
      </section>
    </div>
  );
}
