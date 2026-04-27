import { NextResponse, type NextRequest } from "next/server";
import {
  parsePassportTarget,
  seededCodeGuardianTarget,
  verifyAgent,
  verifyPassportTarget,
} from "../../../lib/proof";

export async function GET(request: NextRequest) {
  const agent = request.nextUrl.searchParams.get("agent");
  try {
    if (agent) {
      return NextResponse.json(await verifyAgent(agent));
    }

    const urlTarget = parseExplorerUrl(
      request.nextUrl.searchParams.get("url"),
    );
    const contract =
      request.nextUrl.searchParams.get("contract") ?? urlTarget?.contract;
    const tokenId =
      request.nextUrl.searchParams.get("tokenId") ?? urlTarget?.tokenId;
    if (!contract && !tokenId) {
      return NextResponse.json(await verifyPassportTarget(seededCodeGuardianTarget()));
    }

    const target = parsePassportTarget({
      chainId:
        request.nextUrl.searchParams.get("chainId") ?? urlTarget?.chainId,
      contract,
      tokenId,
      manifestRoot: request.nextUrl.searchParams.get("manifestRoot"),
    });
    return NextResponse.json(await verifyPassportTarget(target));
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Verification failed",
      },
      { status: 400 },
    );
  }
}

function parseExplorerUrl(value: string | null) {
  if (!value) return null;
  const match = value.match(/(?:chainId=|chains?\/)(\d+).*?(0x[a-fA-F0-9]{40}).*?(?:tokenId=|tokens?\/)(\d+)/);
  if (!match) return null;
  return { chainId: match[1], contract: match[2], tokenId: match[3] };
}
