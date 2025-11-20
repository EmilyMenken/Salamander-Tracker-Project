"use client";

import { useState, useEffect } from "react";
import Color from "./Color";

type Video = {
  id: string;
  fileName: string;
};

export default function Process() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  // Fetch videos like VideoList
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        const data: Video[] = await res.json();
        setVideos(data);
        if (data.length > 0) setSelectedVideo(data[0].fileName); // default selection
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  // Called when Color.tsx form is submitted
  const handleSubmit = async (color: string, threshold: number) => {
    if (!selectedVideo) return;

    setJobId(null);
    setStatus("starting...");
    setResultUrl(null);

    try {
      const res = await fetch(
        `http://localhost:3000/api/process/${selectedVideo}?targetColor=${color.slice(
          1
        )}&threshold=${threshold}`,
        { method: "POST" }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to start job");

      setJobId(data.jobId);
      setStatus("processing...");
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    }
  };

  // Poll job status
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/process/${jobId}/status`);
        const data = await res.json();
        setStatus(data.status);

        if (data.status === "done") {
          setResultUrl(`http://localhost:3000${data.result}`);
          clearInterval(interval);
        } else if (data.status === "error") {
          clearInterval(interval);
        }
      } catch (err) {
        setStatus("Error fetching job status");
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <h2>Process Video</h2>

      {/* Video selector */}
      {videos.length > 0 && (
        <label>
          Select Video:
          <select
            value={selectedVideo}
            onChange={(e) => setSelectedVideo(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            {videos.map((video) => (
              <option key={video.id} value={video.fileName}>
                {video.fileName}
              </option>
            ))}
          </select>
        </label>
      )}

      <Color onSubmit={handleSubmit} />

      {jobId && <p>Job ID: {jobId}</p>}
      {status && <p>Status: {status}</p>}
      {resultUrl && (
        <p>
          Download CSV: <a href={resultUrl} target="_blank" rel="noopener noreferrer">{resultUrl}</a>
        </p>
      )}
    </div>
  );
}
