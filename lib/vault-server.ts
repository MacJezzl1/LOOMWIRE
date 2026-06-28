import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  VaultEntry,
  VaultSyncPayload,
  normalizeCreatorId,
  normalizeVaultEntries,
  vaultStoreName
} from "@/lib/vault-records";

const localStorageDir = path.join(process.cwd(), ".loomwire-storage", "vault");

function keyForCreator(creatorId: string) {
  return `creator-${normalizeCreatorId(creatorId) || "anonymous"}.json`;
}

function localPathForCreator(creatorId: string) {
  return path.join(localStorageDir, keyForCreator(creatorId));
}

async function getNetlifyStore() {
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore(vaultStoreName);
  } catch {
    return null;
  }
}

function buildPayload(creatorId: string, entries: VaultEntry[]): VaultSyncPayload {
  return {
    creatorId: normalizeCreatorId(creatorId) || "anonymous",
    entries: normalizeVaultEntries(entries),
    updatedAt: new Date().toISOString()
  };
}

export async function readVaultPayload(creatorId: string): Promise<VaultSyncPayload> {
  const normalizedCreatorId = normalizeCreatorId(creatorId) || "anonymous";
  const store = await getNetlifyStore();

  if (store) {
    try {
      const payload = (await store.get(keyForCreator(normalizedCreatorId), {
        type: "json",
        consistency: "strong"
      })) as VaultSyncPayload | null;

      if (payload) {
        return buildPayload(normalizedCreatorId, payload.entries);
      }
    } catch {
      // Fall through to the local development store.
    }
  }

  try {
    const file = await readFile(localPathForCreator(normalizedCreatorId), "utf8");
    const payload = JSON.parse(file) as VaultSyncPayload;
    return buildPayload(normalizedCreatorId, payload.entries);
  } catch {
    return buildPayload(normalizedCreatorId, []);
  }
}

export async function writeVaultPayload(creatorId: string, entries: VaultEntry[]) {
  const normalizedCreatorId = normalizeCreatorId(creatorId) || "anonymous";
  const payload = buildPayload(normalizedCreatorId, entries);
  const store = await getNetlifyStore();

  if (store) {
    try {
      await store.setJSON(keyForCreator(normalizedCreatorId), payload, {
        metadata: {
          app: "loomwire",
          updatedAt: payload.updatedAt
        }
      });
      return { payload, storage: "netlify-blobs" as const };
    } catch {
      // Fall through to the local development store.
    }
  }

  await mkdir(localStorageDir, { recursive: true });
  await writeFile(localPathForCreator(normalizedCreatorId), JSON.stringify(payload, null, 2));
  return { payload, storage: "local-file" as const };
}
