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
}: {
  videos: Video[];
  selectedVideoId: string | null;
}) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

export default function Thumbnail({ color, threshold }: ThumbProps) {
  const [original, setOriginal] = useState<string | null>(null);
  const [binarized, setBinarized] = useState<string | null>(null);

  // Load original thumbnail once
  useEffect(() => {
    if (!selectedVideoId) {
      setThumbnail(null);
      return;
    }

    const video = videos.find(v => v.id === selectedVideoId);
    if (!video) return;

    const videoElement = document.createElement("video");
    videoElement.src = video.url;
    videoElement.crossOrigin = "anonymous";
    videoElement.muted = true;
    videoElement.currentTime = 0;

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

    videoElement.addEventListener("loadeddata", () => captureFrame());
  }, [videos, selectedVideoId]);

  // Load binarized thumbnail whenever color/threshold changes
  useEffect(() => {
    const url =
      `http://localhost:3000/api/binarize/ensantina.mp4`
      + `?color=${encodeURIComponent(color)}`
      + `&threshold=${threshold}`;

    setBinarized(url);
  }, [color, threshold]);

  return (
    <div>
      {thumbnail ? (
        <img src={thumbnail} width={300} alt="Video thumbnail" />
      ) : (
        <p>No video selected</p>
      )}
    </div>
  );
}
}
