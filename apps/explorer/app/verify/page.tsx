import Link from "next/link";
import {
  getAgentProfile,
  parsePassportTarget,
  passportPath,
  publicStatus,
  seededCodeGuardianTarget,
  seededFakeAgentTarget,
  verifyPassportTarget,
} from "../../lib/proof";
import { Checklist, EvidencePanel, StatusHeader } from "../../components/proof-ui";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{
    agent?: string;
    chainId?: string;
    contract?: string;
    tokenId?: string;
    manifestRoot?: string;
  }>;
}) {
  const params = await searchParams;
  const status = publicStatus();
  const demoTarget = seededCodeGuardianTarget();
  const hasTokenInput = Boolean(params.contract || params.tokenId);
  const target = hasTokenInput
    ? parsePassportTarget(params)
    : params.agent === "fakeagent"
      ? seededFakeAgentTarget()
      : demoTarget;
  const report = hasTokenInput
    ? await verifyPassportTarget(target)
    : (await getAgentProfile(params.agent === "fakeagent" ? "fakeagent" : "codeguardian"))
        .report;

  return (
    <main className="min-h-screen bg-ink text-white">
      <StatusHeader report={report} />
      <section className="mx-auto max-w-7xl px-5 py-10">
        <form className="mb-8 grid gap-3 rounded-md border border-white/10 bg-black/20 p-4 md:grid-cols-[110px_1fr_120px_auto]">
          <label className="text-sm text-slate-400">
            Chain ID
            <input
              className="mt-1 w-full rounded-md border border-white/10 bg-[#111411] px-3 py-2 text-white"
              name="chainId"
              defaultValue={params.chainId ?? status.chainId}
            />
          </label>
          <label className="text-sm text-slate-400">
            Contract
            <input
              className="mt-1 w-full rounded-md border border-white/10 bg-[#111411] px-3 py-2 text-white"
              name="contract"
              defaultValue={params.contract ?? demoTarget.contract}
            />
          </label>
          <label className="text-sm text-slate-400">
            Token ID
            <input
              className="mt-1 w-full rounded-md border border-white/10 bg-[#111411] px-3 py-2 text-white"
              name="tokenId"
              defaultValue={params.tokenId ?? demoTarget.tokenId}
            />
          </label>
          <button className="self-end rounded-md bg-emerald-300 px-4 py-2 font-semibold text-[#121412]">
            Verify
          </button>
        </form>
        <div className="mb-8 flex flex-wrap gap-3">
          <Link className="rounded-md border border-white/15 px-4 py-2" href="/verify?agent=codeguardian">
            CodeGuardian
          </Link>
          <Link className="rounded-md border border-white/15 px-4 py-2" href="/verify?agent=fakeagent">
            FakeAgent
          </Link>
          <Link
            className="rounded-md border border-white/15 px-4 py-2"
            href={passportPath(target)}
          >
            Open Passport
          </Link>
        </div>
        <Checklist report={report} />
        <div className="mt-10">
          <EvidencePanel report={report} />
        </div>
      </section>
    </main>
  );
}
