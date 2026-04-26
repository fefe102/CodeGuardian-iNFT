import type { NextRequest } from "next/server";
import { guardedAdminOperation } from "../_shared";

export async function POST(request: NextRequest) {
  return guardedAdminOperation(request, "deploy");
}
