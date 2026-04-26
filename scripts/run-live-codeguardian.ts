import { runCodeGuardian, writeCodeGuardianArtifacts } from "@poi/agent-runtime";
import { loadLocalEnv, liveConfig, printSanitizedPlan, writeSafeJson, zeroGEnv } from "./live-helpers";

loadLocalEnv();
const operation = "run-codeguardian";
const config = liveConfig();
printSanitizedPlan(operation, config);

const result = runCodeGuardian({ source: zeroGEnv("COMPUTE_BEARER_TOKEN") ? "hybrid" : "mock" });
writeCodeGuardianArtifacts(result, "tmp/codeguardian-live");
writeSafeJson("deployments/codeguardian-run.json", {
  mode: zeroGEnv("COMPUTE_MODE") ?? "hybrid",
  chainId: config.expectedChainId,
  runId: result.run.runId,
  memoryRoot: result.memoryRootAfter,
  traceRoot: result.certificate.evidence.latestRunRoot,
  computeRunIds: result.computeRuns.runs.map((run) => run.id),
  computeProviderConfigured: Boolean(zeroGEnv("COMPUTE_PROVIDER")),
  computeBearerConfigured: Boolean(zeroGEnv("COMPUTE_BEARER_TOKEN"))
});
