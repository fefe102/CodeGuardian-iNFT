import Link from "next/link";
import { getAgentProfile } from "../../lib/proof";
import { Checklist, StatusHeader } from "../../components/proof-ui";

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ agent?: string }> }) {
  const params = await searchParams;
  const agent = params.agent === "fakeagent" ? "fakeagent" : "codeguardian";
  const profile = await getAgentProfile(agent);

  return (
    <main className="min-h-screen bg-ink text-white">
      <StatusHeader report={profile.report} />
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8 flex flex-wrap gap-3">
          <Link className="rounded-md border border-white/15 px-4 py-2" href="/verify?agent=codeguardian">
            CodeGuardian
          </Link>
          <Link className="rounded-md border border-white/15 px-4 py-2" href="/verify?agent=fakeagent">
            FakeAgent
          </Link>
        </div>
        <Checklist report={profile.report} />
      </section>
    </main>
  );
}
