"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // <-- import useRouter
import Color from "../components/Color";
import Thumbnail from "../components/Thumbnail";

type Video = {
  id: string;
  name: string;
  url: string;
};

export default function BinarizePage() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("videoId");
  const router = useRouter(); // <-- initialize router

  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [color, setColor] = useState("#ff0000");
  const [threshold, setThreshold] = useState(100);

  useEffect(() => {
    const stored = sessionStorage.getItem("videos");
    if (stored) setVideos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!videoId || videos.length === 0) return;
    const vid = videos.find(v => v.id === videoId) || null;
    setSelectedVideo(vid);
  }, [videoId, videos]);

  if (!selectedVideo) return <div>No video selected</div>;

  const handleGoToProcess = () => {
    router.push(
      `/process?videoName=${encodeURIComponent(selectedVideo.name)}&targetColor=${encodeURIComponent(
        color
      )}&threshold=${threshold}`
    );
  };

  return (
    <div>
      <h1>Binarize Video</h1>

      <Color
        color={color}
        threshold={threshold}
        onColorChange={setColor}
        onThresholdChange={setThreshold}
      />

      <Thumbnail
        videos={videos}
        selectedVideoId={selectedVideo.id}
        color={color}
        threshold={threshold}
      />

      <button onClick={handleGoToProcess} style={{ marginTop: "1rem" }}>
        Go to Process Page
      </button>
    </div>
  );
}
