import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:3000/api/videos"); // Express backend
    const data: string[] = await res.json(); // get filenames

    const videos = data.map(fileName => ({
      id: fileName,
      name: fileName,
      url: `http://localhost:3000/api/videos/${encodeURIComponent(fileName)}`, // <-- direct streaming URL
    }));

    return NextResponse.json(videos);
  } catch (err) {
    console.error("Failed to fetch videos from backend:", err);
    return NextResponse.json([], { status: 500 });
  }
}
