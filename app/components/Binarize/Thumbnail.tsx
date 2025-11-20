"use client";
import { useEffect, useState } from "react";

type Video = {
  id: string;
  name: string;
  url: string;
};

export default function Thumbnail({
  videos,
  selectedVideoId,
  color,
  threshold,
}: {
  videos: Video[];
  selectedVideoId: string | null;
  color: string;
  threshold: number;
}) {
  const [original, setOriginal] = useState<string | null>(null);
  const [binarized, setBinarized] = useState<string | null>(null);

  const selectedVideo = videos.find(v => v.id === selectedVideoId);

  // Capture first frame of video as original thumbnail
  useEffect(() => {
    if (!selectedVideo) {
      setOriginal(null);
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
      setOriginal(canvas.toDataURL("image/png"));
    };

    videoElement.addEventListener("loadedmetadata", () => {
      videoElement.currentTime = 0;
      videoElement.addEventListener("seeked", captureFrame, { once: true });
    });
  }, [selectedVideo]);

  // Generate binarized thumbnail from API
  useEffect(() => {
    if (!selectedVideo) {
      setBinarized(null);
      return;
    }

    const url = `http://localhost:3000/api/binarize/${selectedVideo.name}?color=${encodeURIComponent(
      color
    )}&threshold=${threshold}`;

    setBinarized(url);
  }, [selectedVideo, color, threshold]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Original thumbnail */}
      <div>
        {original ? (
          <img src={original} width={300} alt="Original thumbnail" />
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

      {/* Binarized thumbnail */}
      <div>
        {binarized ? (
          <img src={binarized} width={300} alt="Binarized thumbnail" />
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
            <p>No binarized preview</p>
          </div>
        )}
      </div>
    </div>
  );
}