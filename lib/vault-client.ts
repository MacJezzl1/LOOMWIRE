"use client";

import {
  VaultEntry,
  VaultRecordInput,
  normalizeVaultEntries,
  sampleVaultEntries,
  vaultCreatorKey,
  vaultStorageKey
} from "@/lib/vault-records";

export type VaultLoadResult = {
  creatorId: string;
  entries: VaultEntry[];
  source: "server" | "local" | "sample";
  synced: boolean;
};

function safeRandomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `creator-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getCreatorId() {
  const existing = window.localStorage.getItem(vaultCreatorKey);
  if (existing) {
    return existing;
  }

  const next = safeRandomId();
  window.localStorage.setItem(vaultCreatorKey, next);
  return next;
}

export function readLocalVaultEntries() {
  try {
    return normalizeVaultEntries(JSON.parse(window.localStorage.getItem(vaultStorageKey) || "[]"));
  } catch {
    return [];
  }
}

export function writeLocalVaultEntries(entries: VaultEntry[]) {
  const normalized = normalizeVaultEntries(entries);
  window.localStorage.setItem(vaultStorageKey, JSON.stringify(normalized));
  return normalized;
}

function mergeEntries(primary: VaultEntry[], secondary: VaultEntry[]) {
  const byId = new Map<string, VaultEntry>();
  [...primary, ...secondary].forEach((entry) => byId.set(entry.id, entry));
  return normalizeVaultEntries(Array.from(byId.values()));
}

export async function syncVaultEntries(entries: VaultEntry[]) {
  const creatorId = getCreatorId();
  const normalized = writeLocalVaultEntries(entries);

  try {
    const response = await fetch("/api/vault", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creatorId, entries: normalized })
    });

    if (!response.ok) {
      throw new Error("Server vault unavailable.");
    }

    return true;
  } catch {
    return false;
  }
}

export async function loadVaultEntries(): Promise<VaultLoadResult> {
  const creatorId = getCreatorId();
  const localEntries = readLocalVaultEntries();

  try {
    const response = await fetch(`/api/vault?creatorId=${encodeURIComponent(creatorId)}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Server vault unavailable.");
    }

    const payload = (await response.json()) as { entries?: VaultEntry[] };
    const remoteEntries = normalizeVaultEntries(payload.entries || []);
    const merged = mergeEntries(remoteEntries, localEntries);
    writeLocalVaultEntries(merged);

    if (merged.length !== remoteEntries.length || localEntries.length > remoteEntries.length) {
      await syncVaultEntries(merged);
    }

    return {
      creatorId,
      entries: merged.length > 0 ? merged : sampleVaultEntries,
      source: "server",
      synced: true
    };
  } catch {
    return {
      creatorId,
      entries: localEntries.length > 0 ? localEntries : sampleVaultEntries,
      source: localEntries.length > 0 ? "local" : "sample",
      synced: false
    };
  }
}

export async function saveVaultRecord(record: VaultRecordInput) {
  const entry: VaultEntry = {
    ...record,
    id: safeRandomId(),
    createdAt: new Date().toISOString()
  };
  const entries = writeLocalVaultEntries([entry, ...readLocalVaultEntries()]);
  await syncVaultEntries(entries);
  return entry;
}
