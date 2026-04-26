import { NextResponse } from "next/server";
import { getCertificate } from "../../../../lib/proof";

export async function GET(_request: Request, { params }: { params: Promise<{ certificateId: string }> }) {
  const { certificateId } = await params;
  try {
    return NextResponse.json(getCertificate(certificateId));
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Certificate not found" }, { status: 404 });
  }
}
