import {
  computeEvidenceRoots,
  createPassportManifest,
  type PassportDraft,
} from "@poi/sdk";
import { CopyButton } from "../../components/copy-button";
import { badgePath, passportPath, publicStatus } from "../../lib/proof";

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string;
    description?: string;
    contract?: string;
    tokenId?: string;
    owner?: string;
    skills?: string;
    actions?: string;
    memoryPolicy?: string;
  }>;
}) {
  const params = await searchParams;
  const status = publicStatus();
  const draft: PassportDraft = {
    chainId: Number(status.chainId),
    contract:
      params.contract ||
      status.demoInftAddress ||
      "0x0000000000000000000000000000000000000000",
    tokenId: params.tokenId || "1",
    owner:
      params.owner || "0x053b860f329c9e4549d23dc8aadf1116b99f1233",
    name: params.name || "My 0G Agent",
    description:
      params.description ||
      "A testnet iNFT agent with packaged intelligence and memory evidence.",
    skills: (params.skills || "code-review, memory-write")
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
      .map((skill) => ({ name: skill, permissions: ["verify", "replay"] })),
    allowedActions: (params.actions || "verify,replay,export-proof")
      .split(",")
      .map((action) => action.trim())
      .filter(Boolean),
    memoryPolicy: params.memoryPolicy || "checkpointed-kv",
    intelligence: {
      name: params.name || "My 0G Agent",
      goals: ["Publish verifiable Proof-of-Intelligence evidence"],
      behaviorPolicy: "Only execute allowlisted testnet actions.",
      toolPermissions: ["read-public-code", "write-memory-root"],
      skills: (params.skills || "code-review, memory-write")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    },
  };
  const manifest = createPassportManifest(draft);
  const roots = computeEvidenceRoots({ manifest });
  const manifestRoot = roots.manifestRoot ?? "missing";
  const target = {
    chainId: draft.chainId,
    contract: draft.contract,
    tokenId: draft.tokenId,
  };
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://proof-of-intelligence-explorer.vercel.app";
  const passportUrl = `${origin}${passportPath(target)}`;
  const badgeEmbed = `[![Proof of Intelligence](${origin}${badgePath(target)})](${passportUrl})`;
  const wizardSteps = [
    "Basics",
    "Token",
    "Intelligence",
    "Memory/run",
    "Review",
    "Share",
  ];

  return (
    <main className="min-h-screen bg-ink text-white">
      <section className="border-b border-white/10 px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase text-emerald-200">
            Create Passport
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold">
            Generate a public Proof-of-Intelligence Passport.
          </h1>
          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            Package intelligence, memory, and run evidence, compute canonical
            roots, and prepare an allowlisted 0G testnet registration.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[1fr_420px]">
        <form className="space-y-8">
          <div className="rounded-md border border-white/10 bg-black/20 p-4">
            <div className="text-sm uppercase text-slate-500">
              Passport wizard
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-6">
              {wizardSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-3 md:block">
                  <div className="grid h-8 w-8 place-items-center rounded-full border border-emerald-300 bg-emerald-300 text-sm font-semibold text-[#121412]">
                    {index + 1}
                  </div>
                  <div className="mt-0 text-sm font-medium text-slate-200 md:mt-2">
                    {step}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              This hosted flow computes deterministic proof roots first. Live
              testnet registration remains guarded by wallet or admin controls.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Agent name", "name", draft.name],
              ["Token contract", "contract", draft.contract],
              ["Token ID", "tokenId", draft.tokenId],
              ["Owner", "owner", draft.owner],
            ].map(([label, name, value]) => (
              <label key={name} className="text-sm text-slate-400">
                {label}
                <input
                  className="mt-2 w-full rounded-md border border-white/10 bg-[#111411] px-3 py-2 text-white"
                  name={name}
                  defaultValue={value}
                />
              </label>
            ))}
          </div>
          <label className="block text-sm text-slate-400">
            Description
            <textarea
              className="mt-2 min-h-24 w-full rounded-md border border-white/10 bg-[#111411] px-3 py-2 text-white"
              name="description"
              defaultValue={draft.description}
            />
          </label>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm text-slate-400">
              Skills
              <input
                className="mt-2 w-full rounded-md border border-white/10 bg-[#111411] px-3 py-2 text-white"
                name="skills"
                defaultValue={draft.skills.map((skill) => skill.name).join(", ")}
              />
            </label>
            <label className="text-sm text-slate-400">
              Allowed actions
              <input
                className="mt-2 w-full rounded-md border border-white/10 bg-[#111411] px-3 py-2 text-white"
                name="actions"
                defaultValue={draft.allowedActions.join(", ")}
              />
            </label>
            <label className="text-sm text-slate-400">
              Memory policy
              <input
                className="mt-2 w-full rounded-md border border-white/10 bg-[#111411] px-3 py-2 text-white"
                name="memoryPolicy"
                defaultValue={draft.memoryPolicy}
              />
            </label>
          </div>
          <button className="rounded-md bg-emerald-300 px-5 py-3 font-semibold text-[#121412]">
            Preview Passport
          </button>
        </form>

        <aside className="space-y-5 rounded-md border border-white/10 bg-black/20 p-5">
          <div>
            <div className="text-sm uppercase text-slate-500">
              Manifest root
            </div>
            <div className="mt-2 flex flex-wrap items-start gap-2">
              <code className="block min-w-0 flex-1 break-all text-xs text-emerald-200">
                {manifestRoot}
              </code>
              <CopyButton value={manifestRoot} label="Copy root" />
            </div>
          </div>
          <div>
            <div className="text-sm uppercase text-slate-500">
              Passport URL
            </div>
            <div className="mt-2 flex flex-wrap items-start gap-2">
              <code className="block min-w-0 flex-1 break-all text-xs text-emerald-200">
                {passportUrl}
              </code>
              <CopyButton value={passportUrl} label="Copy URL" />
            </div>
          </div>
          <div>
            <div className="text-sm uppercase text-slate-500">
              Badge embed
            </div>
            <div className="mt-2 flex flex-wrap items-start gap-2">
              <code className="block min-w-0 flex-1 break-all text-xs text-emerald-200">
                {badgeEmbed}
              </code>
              <CopyButton value={badgeEmbed} label="Copy badge" />
            </div>
          </div>
          <div>
            <div className="text-sm uppercase text-slate-500">Next step</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              In hosted read-only mode this creates a deterministic Passport
              preview. With live writes enabled, the same roots can be uploaded
              to 0G Storage and registered through the guarded testnet admin
              relay or a wallet-owned transaction.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
