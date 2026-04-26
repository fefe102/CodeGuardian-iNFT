import { NextResponse } from "next/server";
import { publicStatus } from "../../../lib/proof";

export function GET() {
  return NextResponse.json(publicStatus());
}
