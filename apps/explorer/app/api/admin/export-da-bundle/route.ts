import { NextResponse, type NextRequest } from "next/server";
import { adminOperationBody, validateAdminRequest } from "../../../../lib/admin";
import { getDaBundle } from "../../../../lib/proof";

export async function POST(request: NextRequest) {
  const failure = validateAdminRequest(request);
  if (failure) {
    return NextResponse.json(failure.body, { status: failure.status });
  }

  const bundle = await getDaBundle("codeguardian");
  return NextResponse.json({ ...adminOperationBody("export-da-bundle"), bundle });
}
