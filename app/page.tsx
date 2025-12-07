"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Video = {
  id: string;
  name: string;
  url: string;
};

export default function DashboardPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("http://localhost:3000/api/videos"); // <-- YOUR endpoint
        const filenames: string[] = await res.json();

        const backendVideos: Video[] = filenames.map((file, index) => ({
          id: `backend-${index}`,
          name: file,
          url: `http://localhost:3000/videos/${encodeURIComponent(file)}`, // <-- YOUR video base URL
        }));

        setVideos(backendVideos);
      } catch (err) {
        console.error("Failed to load videos:", err);
      }
    }

    loadVideos();
  }, []);

  const handleGoToBinarize = () => {
    if (!selectedVideoId) return;

    const video = videos.find(v => v.id === selectedVideoId);
    if (!video) return;

    // Pass the full video URL to the binarize page
    router.push(`/binarize?url=${encodeURIComponent(video.url)}`);
  };

  return (
    <main>
      <h1>Dashboard</h1>

      {videos.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <label>
            Select Video:
            <select
              value={selectedVideoId}
              onChange={e => setSelectedVideoId(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">Choose a video</option>
              {videos.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={handleGoToBinarize}
            style={{ marginLeft: "10px" }}
            disabled={!selectedVideoId}
          >
            Go to Binarize
          </button>
        </div>
      )}
    </main>
  );
}
