import { NextResponse } from "next/server";
import { getRun } from "../../../../lib/proof";

export async function GET(_request: Request, { params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  try {
    return NextResponse.json(getRun(runId));
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Run not found" }, { status: 404 });
  }
}
