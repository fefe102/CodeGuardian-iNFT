import type { NextRequest } from "next/server";
import {
  adminOperationBody,
  validateAdminRequest,
} from "../../../../lib/admin";
import { getDaBundle } from "../../../../lib/proof";
import { adminJson } from "../_shared";

export async function POST(request: NextRequest) {
  const failure = validateAdminRequest(request);
  if (failure) {
    return adminJson(failure.body, failure.status);
  }

  const bundle = await getDaBundle("codeguardian");
  return adminJson({ ...adminOperationBody("export-da-bundle"), bundle });
}
