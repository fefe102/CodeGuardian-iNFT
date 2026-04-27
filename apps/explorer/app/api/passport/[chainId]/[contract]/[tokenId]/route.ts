import { NextResponse } from "next/server";
import { getPassportForTarget, parsePassportTarget } from "../../../../../../lib/proof";

export async function GET(
  _request: Request,
  {
    params,
  }: { params: Promise<{ chainId: string; contract: string; tokenId: string }> },
) {
  try {
    const target = parsePassportTarget(await params);
    return NextResponse.json(await getPassportForTarget(target));
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Passport not found",
      },
      { status: 400 },
    );
  }
}
