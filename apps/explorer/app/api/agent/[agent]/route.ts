import { NextResponse } from "next/server";
import { getAgentProfile } from "../../../../lib/proof";

export async function GET(_request: Request, { params }: { params: Promise<{ agent: string }> }) {
  const { agent } = await params;
  try {
    return NextResponse.json(await getAgentProfile(agent));
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Agent not found" }, { status: 404 });
  }
}
