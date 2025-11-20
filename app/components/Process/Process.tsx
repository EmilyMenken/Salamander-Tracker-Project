"use client";
import { useState, useEffect } from "react";
import Color from "../Binarize/Color";

type Video = {
  id: string;
  name: string;
  url: string;
};

export default function Process({
  videos,
  selectedVideoId,
  setSelectedVideoId,
}: {
  videos: Video[];
  selectedVideoId: string | null;
  setSelectedVideoId: (id: string) => void;
}) {
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const selectedVideo = videos.find(v => v.id === selectedVideoId);

  // Capture first frame as thumbnail
  useEffect(() => {
    if (!selectedVideo) {
      setThumbnail(null);
      return;
    }

    const videoElement = document.createElement("video");
    videoElement.src = selectedVideo.url;
    videoElement.crossOrigin = "anonymous";
    videoElement.muted = true;

    const captureFrame = () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setThumbnail(dataUrl);
    };

    // Wait until metadata is loaded (so width/height are available)
    videoElement.addEventListener("loadedmetadata", () => {
      videoElement.currentTime = 0;
      // Wait for first frame to be ready
      videoElement.addEventListener("seeked", captureFrame, { once: true });
    });
  }, [selectedVideo]);

  const handleSubmit = async (color: string, threshold: number) => {
    if (!selectedVideo) return;

    setJobId(null);
    setStatus("starting...");
    setResultUrl(null);

    try {
      const res = await fetch(
        `http://localhost:3000/api/process/${selectedVideo.name}?targetColor=${color.slice(
          1
        )}&threshold=${threshold}`,
        { method: "POST" }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to start job");

      setJobId(data.jobId);
      setStatus("processing...");
    } catch (err) {
      setStatus(`Error: ${err}`);
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
        console.log(err)
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
            value={selectedVideoId || ""}
            onChange={(e) => setSelectedVideoId(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="">Select a video</option>
            {videos.map((video) => (
              <option key={video.id} value={video.id}>
                {video.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Color picker and thumbnail side by side */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
        <Color onSubmit={handleSubmit} />
        {thumbnail ? (
          <img src={thumbnail} width={300} alt="Video thumbnail" />
        ) : (
          <div
            style={{
              width: 300,
              height: 200,
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>No video selected</p>
          </div>
        )}
      </div>

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
