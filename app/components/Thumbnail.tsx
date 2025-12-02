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

  const selectedVideo = videos.find((v) => v.id === selectedVideoId);

  // Fetch the original thumbnail from API
  useEffect(() => {
    if (!selectedVideo) {
      setOriginal(null);
      return;
    }

    setLoading(true);

    const fetchThumbnail = async () => {
      try {
        // Replace this URL with your API endpoint
        const url = `http://localhost:3000/api/thumbnail/${selectedVideo.name}`;
        setOriginal(url); // If your API returns the image URL directly
        // If your API returns binary data, you could fetch as blob:
        // const response = await fetch(url);
        // const blob = await response.blob();
        // setOriginal(URL.createObjectURL(blob));
      } catch (err) {
        console.error("Failed to fetch original thumbnail:", err);
        setOriginal(null);
      } finally {
        setLoading(false);
      }
    };

    fetchThumbnail();
  }, [selectedVideo]);

  // Binarize whenever threshold or original changes
  useEffect(() => {
    if (!original) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // Important if API is on a different origin
    img.src = original;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      // Binarize
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        const value = gray >= threshold ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = value;
      }

      ctx.putImageData(imageData, 0, 0);
      setBinarized(canvas.toDataURL("image/png"));
    };
  }, [threshold, original]);

  return (
    <div>
      <div>
        {loading ? (
          <p>Loading thumbnail...</p>
        ) : original ? (
          <img src={original} width={300} alt="Original thumbnail" />
        ) : (
          <p>No video selected</p>
        )}
      </div>

      <div>
        {binarized ? (
          <img src={binarized} width={300} alt="Binarized thumbnail" />
        ) : (
          <p>Generating binarized thumbnail...</p>
        )}
      </div>
    </div>
  );
}
