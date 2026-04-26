import { NextResponse, type NextRequest } from "next/server";
import { adminOperationBody, validateAdminRequest } from "../../../lib/admin";

export async function guardedAdminOperation(
  request: NextRequest,
  operation: string,
) {
  const failure = validateAdminRequest(request);
  if (failure) {
    return adminJson(failure.body, failure.status);
  }

  return adminJson(adminOperationBody(operation));
}

export function adminJson(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}
