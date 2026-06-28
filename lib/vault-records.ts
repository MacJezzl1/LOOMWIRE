export type VaultRecordInput = {
  title: string;
  category: string;
  notes: string;
};

export type VaultEntry = VaultRecordInput & {
  id: string;
  createdAt: string;
};

export type VaultSyncPayload = {
  creatorId: string;
  entries: VaultEntry[];
  updatedAt: string;
};

export const vaultStorageKey = "loomwire-vault-entries";
export const vaultCreatorKey = "loomwire-creator-id";
export const vaultStoreName = "loomwire-creator-vaults";

export const sampleVaultEntries: VaultEntry[] = [
  {
    id: "seed-name",
    title: "LOOMWIRE naming logic",
    category: "Brand name",
    notes:
      "The name connects imagination to execution: loom as culture-making, wire as infrastructure.",
    createdAt: "2026-06-26T04:00:00.000Z"
  },
  {
    id: "seed-lookbook",
    title: "Drop 001 lookbook direction",
    category: "Lookbook",
    notes:
      "Black gallery, acid green signal, warm yellow evidence paper, street archive poster language.",
    createdAt: "2026-06-26T04:20:00.000Z"
  }
];

export function sanitizeText(value: unknown, fallback: string, maxLength = 8000) {
  if (typeof value !== "string") {
    return fallback;
  }

  const cleaned = value.replace(/\s+/g, " ").trim();
  return cleaned.length > 0 ? cleaned.slice(0, maxLength) : fallback;
}

export function normalizeCreatorId(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 80);
}

export function normalizeVaultEntry(value: unknown): VaultEntry | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<VaultEntry>;
  const id =
    typeof candidate.id === "string" && candidate.id.length > 0
      ? candidate.id.slice(0, 120)
      : crypto.randomUUID();
  const createdAt =
    typeof candidate.createdAt === "string" && !Number.isNaN(Date.parse(candidate.createdAt))
      ? candidate.createdAt
      : new Date().toISOString();

  return {
    id,
    createdAt,
    title: sanitizeText(candidate.title, "Untitled evidence", 180),
    category: sanitizeText(candidate.category, "Launch proof", 80),
    notes: sanitizeText(candidate.notes, "No notes supplied.", 12000)
  };
}

export function normalizeVaultEntries(values: unknown, limit = 200) {
  if (!Array.isArray(values)) {
    return [];
  }

  const seen = new Set<string>();
  return values
    .map(normalizeVaultEntry)
    .filter((entry): entry is VaultEntry => {
      if (!entry || seen.has(entry.id)) {
        return false;
      }
      seen.add(entry.id);
      return true;
    })
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, limit);
}
