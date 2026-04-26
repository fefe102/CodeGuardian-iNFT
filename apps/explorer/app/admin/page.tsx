import { AdminClient } from "./admin-client";
import { liveWritesEnabled, publicStatus } from "../../lib/proof";

export default function AdminPage() {
  const status = publicStatus();
  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-semibold">Admin live writes</h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Write actions are server-side only, token-gated, allowlisted, and guarded for 0G Galileo testnet.
          They spend testnet funds when live writes are enabled.
        </p>
        <div className="mt-6 grid gap-4 border-y border-white/10 py-5 md:grid-cols-3">
          <div>
            <div className="text-sm text-slate-500">Mode</div>
            <div className="mt-1 capitalize">{status.mode}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500">Chain</div>
            <div className="mt-1">{status.chainId}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500">Writes</div>
            <div className="mt-1">{status.liveWritesEnabled ? "Enabled" : "Disabled"}</div>
          </div>
        </div>
        <div className="mt-8">
          <AdminClient enabled={liveWritesEnabled()} />
        </div>
      </section>
    </main>
  );
}
