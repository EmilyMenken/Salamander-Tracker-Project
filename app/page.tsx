"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VideoList from "./components/VideoList";
import FileUpload from "./components/FileUpload";

type Video = {
  id: string;
  name: string;
  url: string;
  backend?: boolean; // mark backend videos so they can't be deleted
};

export default function DashboardPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadVideos() {
      try {
        // Fetch video list from backend API
        const res = await fetch("http://localhost:3000/api/videos");
        const data: { fileName?: string }[] = await res.json();

        const backendVideos: Video[] = data
          .filter(v => v.fileName)
          .map(v => ({
            id: `backend-${v.fileName}`,
            name: v.fileName!,
            // Use static /videos route to play
            url: `http://localhost:3000/videos/${encodeURIComponent(v.fileName!)}`,
            backend: true,
          }));

        // Load uploaded videos from sessionStorage
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

  function handleDeleteVideo(id: string) {
    setVideos(prev => {
      const updated = prev.filter(v => v.id !== id);
      // Update sessionStorage for uploaded videos only
      const uploadedVideos = updated.filter(v => !v.backend);
      sessionStorage.setItem("videos", JSON.stringify(uploadedVideos));
      // If deleted video was selected, reset selection
      if (selectedVideoId === id) setSelectedVideoId(null);
      return updated;
    });
  }

  const handleGoToBinarize = () => {
    if (!selectedVideoId) return;
    router.push(`/binarize?videoId=${selectedVideoId}`);
  };

  return (
    <main>
      <h1>Dashboard</h1>

      <FileUpload onAdd={handleAddVideo} />
      <div>
        {videos.map(v => (
          <div key={v.id} style={{ marginBottom: "20px" }}>
            <p>{v.name}</p>
            <video src={v.url} width={300} controls />
            {!v.backend && (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleDeleteVideo(v.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {videos.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <label>
            Select Video:
            <select
              value={selectedVideoId || ""}
              onChange={e => setSelectedVideoId(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select a video</option>
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
