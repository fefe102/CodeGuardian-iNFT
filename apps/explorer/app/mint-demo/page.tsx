import Link from "next/link";
import { publicStatus } from "../../lib/proof";

export default function MintDemoPage() {
  const status = publicStatus();
  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-white">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-semibold">Mint Demo iNFT</h1>
        <p className="mt-4 text-slate-400">
          Judges do not need to mint anything. CodeGuardian and FakeAgent are seeded for public verification.
          Admin-only live mint/seed operations are available from the guarded admin panel.
        </p>
        <div className="mt-8 border-y border-white/10 py-5">
          <div className="text-sm text-slate-500">Live write status</div>
          <div className="mt-2 text-xl">{status.liveWritesEnabled ? "Enabled" : "Disabled"}</div>
        </div>
        <Link className="mt-6 inline-flex rounded-md bg-emerald-300 px-4 py-2 font-semibold text-[#121412]" href="/admin">
          Open admin panel
        </Link>
      </section>
    </main>
  );
}
