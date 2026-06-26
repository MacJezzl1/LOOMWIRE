"use client";

import { useState } from "react";
import { Archive, Check } from "lucide-react";

type VaultRecordInput = {
  title: string;
  category: string;
  notes: string;
};

type VaultEntry = VaultRecordInput & {
  id: string;
  createdAt: string;
};

const storageKey = "loomwire-vault-entries";

function readEntries(): VaultEntry[] {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as VaultEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveVaultRecord(record: VaultRecordInput) {
  const entry: VaultEntry = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  const entries = [entry, ...readEntries()];
  window.localStorage.setItem(storageKey, JSON.stringify(entries));
  return entry;
}

export function SaveToVaultButton({
  record,
  className = "btn btn-ghost"
}: {
  record: VaultRecordInput;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        saveVaultRecord(record);
        setSaved(true);
        window.setTimeout(() => setSaved(false), 1800);
      }}
    >
      {saved ? <Check size={18} /> : <Archive size={18} />}
      {saved ? "Saved" : "Save to Vault"}
    </button>
  );
}
