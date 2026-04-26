"use client";

import { useState } from "react";

const operations = [
  ["Deploy/Check Contracts", "/api/admin/deploy"],
  ["Seed Live Demo", "/api/admin/seed-demo"],
  ["Run CodeGuardian", "/api/admin/run-codeguardian"],
  ["Issue Certificate", "/api/admin/issue-certificate"],
  ["Export DA Bundle", "/api/admin/export-da-bundle"]
] as const;

export function AdminClient({ enabled }: { enabled: boolean }) {
  const [token, setToken] = useState("");
  const [log, setLog] = useState<string[]>([]);

  async function run(path: string) {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const body = await response.json();
    setLog((current) => [`${response.status} ${path}: ${JSON.stringify(body)}`, ...current].slice(0, 8));
  }

  return (
    <div className="space-y-6">
      <div className="border-y border-white/10 py-5">
        <label className="text-sm text-slate-400" htmlFor="admin-token">
          Admin token
        </label>
        <input
          id="admin-token"
          className="mt-2 w-full rounded-md border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:border-emerald-300"
          type="password"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="Paste token for this session"
        />
      </div>
      {!enabled ? (
        <p className="rounded-md border border-amber-400/30 bg-amber-400/10 p-4 text-amber-100">
          Live write actions are disabled. Public verification remains available.
        </p>
      ) : null}
      <div className="grid gap-3 md:grid-cols-2">
        {operations.map(([label, path]) => (
          <button
            key={path}
            className="rounded-md border border-white/15 px-4 py-3 text-left font-semibold text-white transition hover:border-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!enabled || !token}
            onClick={() => run(path)}
          >
            {label}
          </button>
        ))}
      </div>
      <div>
        <h2 className="text-lg font-semibold">Sanitized operation logs</h2>
        <pre className="mt-3 min-h-48 overflow-auto rounded-md bg-black/25 p-4 text-xs text-slate-300">{log.join("\n\n")}</pre>
      </div>
    </div>
  );
}
