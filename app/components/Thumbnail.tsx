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
  selectedVideoId: string;
  color: string;
  threshold: number;
}) {
  const [original, setOriginal] = useState<string | null>(null);
  const [binarized, setBinarized] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedVideo = videos.find(v => v.id === selectedVideoId);

  // Capture first frame
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

  // Generate binarized thumbnail
  useEffect(() => {
    if (!selectedVideo) {
      setBinarized(null);
      return;
    }
    setLoading(true);
    const url = `http://localhost:3000/api/binarize/${selectedVideo.name}?color=${encodeURIComponent(color)}&threshold=${threshold}`;
    setBinarized(url);
    setTimeout(() => setLoading(false), 200); // simulate loading
  }, [selectedVideo, color, threshold]);

  return (
    <div>
      <div>
        {original ? (
          <img src={original} width={300} alt="Original thumbnail" />
        ) : (
          <div>
            <p>No video selected</p>
          </div>
        )}
      </div>

      <div>
        {loading ? (
          <p>Loading binarized thumbnail...</p>
        ) : (
          binarized && <img src={binarized} width={300} alt="Binarized thumbnail" />
        )}
      </div>
    </div>
  );
}
