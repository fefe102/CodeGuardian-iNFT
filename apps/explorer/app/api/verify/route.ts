import { NextResponse, type NextRequest } from "next/server";
import { verifyAgent } from "../../../lib/proof";

export async function GET(request: NextRequest) {
  const agent = request.nextUrl.searchParams.get("agent") ?? "codeguardian";
  try {
    return NextResponse.json(await verifyAgent(agent));
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Verification failed" }, { status: 404 });
  }
}
