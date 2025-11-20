"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VideoList from "./components/VideoList";
import FileUpload from "./components/FileUpload";

type Video = {
  id: string;
  name: string;
  url: string;
};

export default function DashboardPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const router = useRouter();

  function handleAddVideo(file: File) {
    const url = URL.createObjectURL(file);
    const newVid = { id: crypto.randomUUID(), name: file.name, url };
    setVideos(prev => [...prev, newVid]);
  }

  const handleGoToBinarize = () => {
    if (!selectedVideoId) return;
    router.push(`/binarize?videoId=${selectedVideoId}`);
  };

  return (
    <main>
      <h1>Dashboard</h1>

      <FileUpload onAdd={handleAddVideo} />
      <VideoList videos={videos} />

      {/* Video selector */}
      {videos.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <label>
            Select Video:
            <select
              value={selectedVideoId || ""}
              onChange={(e) => setSelectedVideoId(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select a video</option>
              {videos.map((v) => (
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
