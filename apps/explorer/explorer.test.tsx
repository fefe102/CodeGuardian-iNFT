import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import AdminPage from "./app/admin/page";
import AgentPage from "./app/agent/[agent]/page";
import CertificatePage from "./app/certificate/[certificateId]/page";
import HomePage from "./app/page";
import RunPage from "./app/run/[runId]/page";
import { adminJson } from "./app/api/admin/_shared";
import { adminOperationBody, validateAdminRequest } from "./lib/admin";
import { publicStatus } from "./lib/proof";

const originalEnv = { ...process.env };
const adminTokenName = "POI_ADMIN_TOKEN";
const privateKeyName = "0G_PRIVATE_KEY";
const bearerName = "0G_COMPUTE_BEARER_TOKEN";

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("explorer app smoke tests", () => {
  it("home page renders", async () => {
    const html = renderToString(await HomePage());
    expect(html).toContain("Proof-of-Intelligence Explorer");
    expect(html).toContain("Verify CodeGuardian");
  });

  it("CodeGuardian page renders high-tier verification", async () => {
    const html = renderToString(
      await AgentPage({ params: Promise.resolve({ agent: "codeguardian" }) }),
    );
    expect(html).toContain("CodeGuardian");
    expect(html).toContain("Certified");
    expect(html).toContain("Encrypted intelligence bundle");
  });

  it("FakeAgent page renders failures", async () => {
    const html = renderToString(
      await AgentPage({ params: Promise.resolve({ agent: "fakeagent" }) }),
    );
    expect(html).toContain("FakeAgent");
    expect(html).toContain("Proof-of-Intelligence manifest");
    expect(html).toContain("fail");
  });

  it("replay page renders the timeline", async () => {
    const html = renderToString(
      await RunPage({
        params: Promise.resolve({ runId: "codeguardian-run-001" }),
      }),
    );
    expect(html).toContain("task_received");
    expect(html).toContain("certificate_issued");
  });

  it("certificate page renders certificate", async () => {
    const html = renderToString(
      await CertificatePage({
        params: Promise.resolve({ certificateId: "poi-cert-codeguardian-001" }),
      }),
    );
    expect(html).toContain("Proof-of-Intelligence Certificate");
    expect(html).toContain("CodeGuardian");
  });

  it("admin page does not expose secrets", () => {
    process.env[adminTokenName] = "fixture-admin-token-alpha";
    process.env[privateKeyName] = "fixture-wallet-material";
    const html = renderToString(<AdminPage />);
    expect(html).not.toContain("fixture-admin-token-alpha");
    expect(html).not.toContain("fixture-wallet-material");
  });
});

describe("admin route security", () => {
  it("rejects a missing token", () => {
    process.env[adminTokenName] = "fixture-admin-token";
    process.env.POI_ENABLE_LIVE_WRITES = "true";
    const result = validateAdminRequest({ headers: new Headers() });
    expect(result?.status).toBe(401);
  });

  it("rejects an invalid token", () => {
    process.env[adminTokenName] = "fixture-admin-token";
    process.env.POI_ENABLE_LIVE_WRITES = "true";
    const result = validateAdminRequest({
      headers: new Headers({ authorization: "Bearer wrong" }),
    });
    expect(result?.status).toBe(401);
  });

  it("accepts a valid token only when live writes are enabled", () => {
    process.env[adminTokenName] = "fixture-admin-token";
    process.env.POI_ENABLE_LIVE_WRITES = "true";
    const result = validateAdminRequest({
      headers: new Headers({ authorization: "Bearer fixture-admin-token" }),
    });
    expect(result).toBeNull();
  });

  it("marks admin responses as non-cacheable", () => {
    const response = adminJson({ ok: false }, 403);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
  });

  it("does not return secrets from admin operation bodies", () => {
    process.env[adminTokenName] = "fixture-admin-token";
    process.env[privateKeyName] = "fixture-wallet-material";
    const body = JSON.stringify(adminOperationBody("deploy"));
    expect(body).not.toContain("fixture-admin-token");
    expect(body).not.toContain("fixture-wallet-material");
  });

  it("public status does not expose private env values", () => {
    process.env[adminTokenName] = "fixture-admin-token";
    process.env[privateKeyName] = "fixture-wallet-material";
    process.env[bearerName] = "fixture-bearer";
    const body = JSON.stringify(publicStatus());
    expect(body).not.toContain("fixture-admin-token");
    expect(body).not.toContain("fixture-wallet-material");
    expect(body).not.toContain("fixture-bearer");
  });
});
