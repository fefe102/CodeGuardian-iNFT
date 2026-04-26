import { NextResponse, type NextRequest } from "next/server";
import { adminOperationBody, validateAdminRequest } from "../../../lib/admin";

export async function guardedAdminOperation(request: NextRequest, operation: string) {
  const failure = validateAdminRequest(request);
  if (failure) {
    return NextResponse.json(failure.body, { status: failure.status });
  }

  return NextResponse.json(adminOperationBody(operation));
}
