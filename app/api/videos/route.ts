import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:3000/api/videos"); // Your Express backend
    const data = await res.json();

    // Map backend data to Next.js Video type
    const videos = data
      .filter((v: any) => v.fileName)
      .map((v: any) => ({
        id: v.fileName,
        fileName: v.fileName,
      }));

    return NextResponse.json(videos);
  } catch (err) {
    console.error("Failed to fetch videos from backend:", err);
    return NextResponse.json([], { status: 500 });
  }
}
