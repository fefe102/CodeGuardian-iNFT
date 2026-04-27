import { describe, expect, it } from "vitest";
import codeguardianBundle from "../fixtures/codeguardian.intelligence.encrypted.json";
import codeguardianCertificate from "../fixtures/codeguardian.certificate.json";
import codeguardianManifest from "../fixtures/codeguardian.manifest.json";
import codeguardianMemory from "../fixtures/codeguardian.memory.json";
import codeguardianRun from "../fixtures/codeguardian.run.json";
import {
  ManifestSchema,
  MockComputeAdapter,
  MockStorageAdapter,
  canonicalizeJson,
  createVerifier,
  createPassportManifest,
  createPoiRecorder,
  exportDaBundle,
  hashRunTrace,
  hashManifestForProof,
  hashCanonicalJson,
  passportFromReport,
  badgeStatusForTier,
  verifyComputeHistory,
  verifyCertificate,
  verifyIntelligenceBundle,
  verifyManifest,
  verifyMemory,
  type ComputeRuns,
  type Manifest,
  type RunTrace,
} from "./index";

describe("Proof-of-Intelligence SDK", () => {
  it("accepts a valid manifest", () => {
    const manifest = verifyManifest(codeguardianManifest);
    expect(manifest.schema).toBe("poi/v0.1");
    expect(hashManifestForProof(manifest)).toBe(manifest.storage.manifestRoot);
  });

  it("rejects an invalid manifest", () => {
    expect(ManifestSchema.safeParse({ schema: "poi/v0.1" }).success).toBe(
      false,
    );
  });

  it("keeps canonical JSON hashing stable regardless of key order", () => {
    const left = { b: 2, a: { d: true, c: ["x"] } };
    const right = { a: { c: ["x"], d: true }, b: 2 };
    expect(canonicalizeJson(left)).toEqual(canonicalizeJson(right));
    expect(hashCanonicalJson(left)).toEqual(hashCanonicalJson(right));
  });

  it("verifies CodeGuardian at the certified tier", async () => {
    const report = await createVerifier().verify("codeguardian");
    expect(report.tier).toBe(6);
    expect(report.status).toBe("verified");
    expect(report.checks.every((check) => check.ok)).toBe(true);
  });

  it("keeps FakeAgent at a low failing tier", async () => {
    const report = await createVerifier().verify("fakeagent");
    expect(report.tier).toBeLessThanOrEqual(1);
    expect(report.status).toBe("failed");
    expect(report.missing).toContain("Proof-of-Intelligence manifest");
  });

  it("returns a low tier for an arbitrary token with no manifest", async () => {
    const report = await createVerifier().verify({
      contract: "0x1111111111111111111111111111111111117857",
      tokenId: "1",
    });
    expect(report.tier).toBe(6);

    const missing = await createVerifier().verify({
      contract: "0x9999999999999999999999999999999999999999",
      tokenId: "404",
    });
    expect(missing.tier).toBe(0);
    expect(missing.status).toBe("unsupported");
  });

  it("detects an intelligence root mismatch", () => {
    const check = verifyIntelligenceBundle(
      codeguardianBundle,
      "sha256:9999999999999999999999999999999999999999999999999999999999999999",
    );
    expect(check.ok).toBe(false);
  });

  it("detects a memory root mismatch", () => {
    const check = verifyMemory(
      codeguardianMemory,
      "sha256:9999999999999999999999999999999999999999999999999999999999999999",
    );
    expect(check.ok).toBe(false);
  });

  it("reduces tier when compute runs are missing", async () => {
    class EmptyComputeAdapter extends MockComputeAdapter {
      override async getRuns(): Promise<ComputeRuns | null> {
        return null;
      }
    }

    const report = await createVerifier({
      compute: new EmptyComputeAdapter(),
    }).verify("codeguardian");
    expect(report.tier).toBe(4);
    expect(report.missing).toContain("0G Compute run history");
  });

  it("reduces tier when the run trace is missing", async () => {
    class MissingTraceStorage extends MockStorageAdapter {
      override async getJsonByRoot<T>(root: string): Promise<T | null> {
        if (root === (codeguardianManifest as Manifest).storage.latestRunRoot) {
          return null;
        }
        return super.getJsonByRoot<T>(root);
      }
    }

    const report = await createVerifier({
      storage: new MissingTraceStorage(),
    }).verify("codeguardian");
    expect(report.tier).toBe(4);
    expect(report.missing).toContain("Executable behavior trace");
  });

  it("does not fail when optional ENS is absent", async () => {
    const manifest = structuredClone(codeguardianManifest) as Manifest;
    delete manifest.identity.ens;
    manifest.storage.manifestRoot = hashManifestForProof(manifest);
    const report = await createVerifier().verify({ manifest });
    expect(report.tier).toBe(6);
    expect(report.checks.find((check) => check.id === "ens")?.ok).toBe(true);
  });

  it("does not require DA evidence for verification", async () => {
    const report = await createVerifier().verify("codeguardian");
    const bundle = await exportDaBundle(report);
    expect(report.tier).toBe(6);
    expect(bundle.schema).toBe("poi-da-bundle/v0.1");
    expect(bundle.roots.length).toBeGreaterThan(0);
  });

  it("reports missing compute ids", () => {
    const check = verifyComputeHistory(
      {
        schema: "poi-compute-runs/v0.1",
        provider: "mock",
        model: "mock",
        runs: [],
      },
      ["missing"],
    );
    expect(check.ok).toBe(false);
  });

  it("detects certificate iNFT mismatches", () => {
    const certificate = structuredClone(codeguardianCertificate);
    certificate.evidence.inft.contract =
      "0x9999999999999999999999999999999999999999";
    const check = verifyCertificate(
      certificate,
      codeguardianManifest as Manifest,
    );
    expect(check.ok).toBe(false);
  });

  it("validates the bundled run trace root", () => {
    const run = codeguardianRun as RunTrace;
    expect(JSON.stringify(run)).not.toContain(
      "sha256:0000000000000000000000000000000000000000000000000000000000000000",
    );
    expect(hashRunTrace(run)).toBe(
      (codeguardianManifest as Manifest).storage.latestRunRoot,
    );
  });

  it("creates Passport drafts and recorder traces", async () => {
    const manifest = createPassportManifest({
      chainId: 16602,
      contract: "0x1111111111111111111111111111111111117857",
      tokenId: "7",
      owner: "0x053b860f329c9e4549d23dc8aadf1116b99f1233",
      name: "BuilderAgent",
      description: "A builder-created testnet Passport.",
      skills: [{ name: "audit" }],
      allowedActions: ["verify"],
      memoryPolicy: "checkpointed-kv",
      intelligence: { goals: ["test"] },
    });
    expect(hashManifestForProof(manifest)).toBe(
      manifest.storage.manifestRoot,
    );

    const recorder = createPoiRecorder({
      chainId: 16602,
      contract: manifest.inft.contract,
      tokenId: manifest.inft.tokenId,
      agent: manifest.name,
    });
    await recorder.startRun({ task: "Audit this repository" });
    await recorder.recordComputeCall({
      model: "0G Compute",
      inputHash: manifest.storage.manifestRoot,
      outputHash: manifest.storage.memoryRoot,
    });
    await recorder.recordMemoryWrite({
      memoryRoot: manifest.storage.memoryRoot,
    });
    const run = await recorder.finishRun({
      resultRoot: manifest.storage.latestRunRoot,
    });
    expect(run.events.map((event) => event.type)).toContain(
      "compute_completed",
    );
  });

  it("maps reports to passports and badge statuses", async () => {
    const report = await createVerifier().verify("codeguardian");
    const passport = passportFromReport(report);
    expect(passport.verificationTier).toBe(6);
    expect(badgeStatusForTier(passport.verificationTier)).toBe("Tier 6");
    expect(badgeStatusForTier(2)).toBe("Partial");
    expect(badgeStatusForTier(1)).toBe("Failed");
    expect(badgeStatusForTier(0)).toBe("Unknown");
  });
});
