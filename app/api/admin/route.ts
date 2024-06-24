import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const body = req.body;
  console.log(body);
  return NextResponse.json({ message: "success" });
}
