// app/api/videos/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: "1", fileName: "ballsMoving.mp4" },
  ]);
}