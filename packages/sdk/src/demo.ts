import codeguardianCertificateFixture from "../fixtures/codeguardian.certificate.json";
import codeguardianManifestFixture from "../fixtures/codeguardian.manifest.json";
import codeguardianRunFixture from "../fixtures/codeguardian.run.json";
import fakeagentMetadataFixture from "../fixtures/fakeagent.metadata.json";
import type { Certificate, Manifest, RunTrace } from "./schema";

export const codeguardianManifest = codeguardianManifestFixture as Manifest;
export const codeguardianRun = codeguardianRunFixture as RunTrace;
export const codeguardianCertificate = codeguardianCertificateFixture as Certificate;
export const fakeagentMetadata = fakeagentMetadataFixture;
