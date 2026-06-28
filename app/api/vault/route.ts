import { NextRequest, NextResponse } from "next/server";
import {
  VaultEntry,
  normalizeCreatorId,
  normalizeVaultEntries,
  normalizeVaultEntry
} from "@/lib/vault-records";
import { readVaultPayload, writeVaultPayload } from "@/lib/vault-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

function creatorIdFromRequest(request: NextRequest, body?: { creatorId?: unknown }) {
  return normalizeCreatorId(
    body?.creatorId || request.nextUrl.searchParams.get("creatorId") || ""
  );
}

export async function GET(request: NextRequest) {
  const creatorId = creatorIdFromRequest(request);

  if (!creatorId) {
    return json({ error: "Missing creatorId." }, 400);
  }

  const payload = await readVaultPayload(creatorId);
  return json(payload);
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as {
    creatorId?: unknown;
    entry?: unknown;
    record?: unknown;
  } | null;
  const creatorId = creatorIdFromRequest(request, body || undefined);

  if (!creatorId) {
    return json({ error: "Missing creatorId." }, 400);
  }

  const existing = await readVaultPayload(creatorId);
  const entry = normalizeVaultEntry(body?.entry || body?.record);

  if (!entry) {
    return json({ error: "Missing vault entry." }, 400);
  }

  const entries = normalizeVaultEntries([entry, ...existing.entries]);
  const { payload, storage } = await writeVaultPayload(creatorId, entries);
  return json({ ...payload, storage });
}

export async function PUT(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as {
    creatorId?: unknown;
    entries?: VaultEntry[];
  } | null;
  const creatorId = creatorIdFromRequest(request, body || undefined);

  if (!creatorId) {
    return json({ error: "Missing creatorId." }, 400);
  }

  const entries = normalizeVaultEntries(body?.entries || []);
  const { payload, storage } = await writeVaultPayload(creatorId, entries);
  return json({ ...payload, storage });
}
