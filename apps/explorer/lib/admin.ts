import { createHash, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { liveWritesEnabled, sanitizedOperation } from "./proof";

export type AdminResult =
  | { ok: true; status: number; body: Record<string, unknown> }
  | { ok: false; status: number; body: Record<string, unknown> };

export function validateAdminRequest(
  request: Pick<NextRequest, "headers">,
): AdminResult | null {
  const configuredToken = process.env.POI_ADMIN_TOKEN;
  if (!configuredToken) {
    return {
      ok: false,
      status: 403,
      body: {
        ok: false,
        error:
          "Live write actions are disabled. Public verification remains available.",
      },
    };
  }

  const authorization = request.headers.get("authorization");
  const bearer = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : undefined;
  const headerToken = request.headers.get("x-poi-admin-token") ?? undefined;
  const supplied = bearer ?? headerToken;

  if (!supplied) {
    return {
      ok: false,
      status: 401,
      body: { ok: false, error: "Missing admin token" },
    };
  }

  if (!tokenMatches(supplied, configuredToken)) {
    return {
      ok: false,
      status: 401,
      body: { ok: false, error: "Invalid admin token" },
    };
  }

  if (!liveWritesEnabled()) {
    return {
      ok: false,
      status: 403,
      body: {
        ok: false,
        error:
          "Live write actions are disabled. Public verification remains available.",
      },
    };
  }

  return null;
}

export function adminOperationBody(operation: string) {
  return {
    ok: true,
    ...sanitizedOperation(operation),
    result: {
      status: "accepted",
      sanitized: true,
      privateValuesReturned: false,
    },
  };
}

function tokenMatches(supplied: string, configured: string) {
  const suppliedDigest = digestToken(supplied);
  const configuredDigest = digestToken(configured);
  return timingSafeEqual(suppliedDigest, configuredDigest);
}

function digestToken(value: string) {
  return createHash("sha256").update(value, "utf8").digest();
}
