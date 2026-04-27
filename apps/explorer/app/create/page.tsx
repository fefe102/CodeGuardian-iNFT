import {
  computeEvidenceRoots,
  createPassportManifest,
  type PassportDraft,
} from "@poi/sdk";
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
  const target = {
    chainId: draft.chainId,
    contract: draft.contract,
    tokenId: draft.tokenId,
  };
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://proof-of-intelligence-explorer.vercel.app";

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
            <code className="mt-2 block break-all text-xs text-emerald-200">
              {roots.manifestRoot}
            </code>
          </div>
          <div>
            <div className="text-sm uppercase text-slate-500">
              Passport URL
            </div>
            <code className="mt-2 block break-all text-xs text-emerald-200">
              {origin}
              {passportPath(target)}
            </code>
          </div>
          <div>
            <div className="text-sm uppercase text-slate-500">
              Badge embed
            </div>
            <code className="mt-2 block break-all text-xs text-emerald-200">
              {`[![Proof of Intelligence](${origin}${badgePath(target)})](${origin}${passportPath(target)})`}
            </code>
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
