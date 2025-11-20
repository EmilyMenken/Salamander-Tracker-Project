"use client";

import { useState } from "react";
import VideoList from "./components/VideoList";
import Thumbnail from "./components/Thumbnail";
import JobStatus from "./components/JobStatus";
import Process from "./components/Process";
import FileUpload from "./components/FileUpload";

type Video = {
  id: string;
  name: string;
  url: string;
};

export default function DashboardPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  function handleAddVideo(file: File) {
    const url = URL.createObjectURL(file);
    const newVid = { id: crypto.randomUUID(), name: file.name, url };
    setVideos(prev => [...prev, newVid]);
    // Do NOT auto-select, user will choose manually
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <FileUpload onAdd={handleAddVideo} />
      <VideoList videos={videos} />
      <Process
        videos={videos}
        selectedVideoId={selectedVideoId}
        setSelectedVideoId={setSelectedVideoId}
      />
      <Thumbnail
        videos={videos}
        selectedVideoId={selectedVideoId}
      />
      <JobStatus />
    </main>
  );
}
