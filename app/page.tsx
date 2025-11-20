"use client";

import { useState } from "react";
import VideoList from "./components/VideoList";
import Thumbnail from "./components/Thumbnail";
import JobStatus from "./components/JobStatus";
import Process from "./components/Process";
import FileUpload from "./components/FileUpload";

export default function DashboardPage() {
  const [videos, setVideos] = useState([]);

  function handleAddVideo(file: File) {
    const url = URL.createObjectURL(file);

    const newVid = {
      id: crypto.randomUUID(),
      name: file.name,
      url,
    };

    setVideos(prev => [...prev, newVid]);
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <FileUpload onAdd={handleAddVideo} />

      <VideoList videos={videos} />

      <Thumbnail />
      <Process />
      <JobStatus />
    </main>
  );
}
