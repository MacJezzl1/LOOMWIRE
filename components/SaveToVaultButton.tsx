"use client";

import { useEffect, useState } from "react";
import { Archive, Check } from "lucide-react";
import { saveVaultRecord } from "@/lib/vault-client";
import type { VaultRecordInput } from "@/lib/vault-records";

export { saveVaultRecord };

export function SaveToVaultButton({
  record,
  className = "btn btn-ghost"
}: {
  record: VaultRecordInput;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <button
      type="button"
      className={className}
      disabled={!ready || saving}
      onClick={async () => {
        if (!ready || saving) {
          return;
        }

        setSaving(true);
        await saveVaultRecord(record);
        setSaved(true);
        setSaving(false);
        window.setTimeout(() => setSaved(false), 1800);
      }}
    >
      {saved ? <Check size={18} /> : <Archive size={18} />}
      {saved ? "Saved" : saving ? "Saving" : "Save to Vault"}
    </button>
  );
}
