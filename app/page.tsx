"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VideoList from "./components/VideoList";
import FileUpload from "./components/FileUpload";

type Video = {
  id: string;
  name: string;
  url: string;
  backend?: boolean; // mark backend videos
  removed?: boolean; // temporary removal flag
};

export default function DashboardPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("http://localhost:3000/api/videos");
        const filenames: string[] = await res.json();

        const backendVideos: Video[] = filenames.map((file, index) => ({
          id: `backend-${index}`,
          name: file,
          url: `http://localhost:3000/api/videos/${encodeURIComponent(file)}`, // use API route directly
          backend: true,
        }));

        const stored = sessionStorage.getItem("videos");
        const uploadedVideos: Video[] = stored
          ? JSON.parse(stored).filter((v: any) => v.name && v.url)
          : [];

        setVideos([...backendVideos, ...uploadedVideos]);
      } catch (err) {
        console.error("Failed to load videos:", err);
      }
    }

    loadVideos();
  }, []);

  function handleAddVideo(file: File) {
    if (!file.name) return;
    const url = URL.createObjectURL(file);
    const newVid: Video = { id: crypto.randomUUID(), name: file.name, url };

    setVideos(prev => {
      const updated = [...prev, newVid];
      const uploadedVideos = updated.filter(v => !v.backend);
      sessionStorage.setItem("videos", JSON.stringify(uploadedVideos));
      return updated;
    });
  }

  // Temporary remove video from dashboard
  function handleRemoveVideo(id: string) {
    setVideos(prev =>
      prev.map(v => (v.id === id ? { ...v, removed: true } : v))
    );
    if (selectedVideoId === id) setSelectedVideoId(null);
  }

  const handleGoToBinarize = () => {
    if (!selectedVideoId) return;
    router.push(`/binarize?videoId=${selectedVideoId}`);
  };

  const visibleVideos = videos.filter(v => !v.removed);

  return (
    <main>
      <h1>Dashboard</h1>

      <FileUpload onAdd={handleAddVideo} />

      <VideoList videos={visibleVideos} onRemove={handleRemoveVideo} />

      {visibleVideos.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <label>
            Select Video:
            <select
              value={selectedVideoId || ""}
              onChange={e => setSelectedVideoId(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select a video</option>
              {visibleVideos.map(v => (
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
