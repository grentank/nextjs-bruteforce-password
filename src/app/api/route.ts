import findHashIndex from "@/utils/findHashIndex";
import findPasswordByIndex from "@/utils/findPasswordByIndex";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  const myHash = crypto.createHash("sha256").update("helloworld").digest("hex");
  const index = await findHashIndex(myHash);
  if (!index) return NextResponse.json({ password: null });
  const password = await findPasswordByIndex(index);
  return NextResponse.json({ password });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body) return NextResponse.json({ password: null });
  if (!body.text) return NextResponse.json({ password: null });
  const requestHash = body.text;
  const index = await findHashIndex(requestHash);
  if (!index) return NextResponse.json({ password: null });
  const password = await findPasswordByIndex(index);
  return NextResponse.json({ password });
}
