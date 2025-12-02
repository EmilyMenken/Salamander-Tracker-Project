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
  color: string;         // Hex color e.g. "#FF0000"
  threshold: number;     // 0 - 255
}) {
  const [original, setOriginal] = useState<string | null>(null);
  const [binarized, setBinarized] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedVideo = videos.find((v) => v.id === selectedVideoId);

  // Fetch original thumbnail from API
  useEffect(() => {
    if (!selectedVideo) {
      setOriginal(null);
      return;
    }

    setLoading(true);

    const fetchThumbnail = async () => {
      try {
        const url = `http://localhost:3000/api/thumbnail/${selectedVideo.name}`;
        setOriginal(url);
      } catch (err) {
        console.error("Failed to fetch original thumbnail:", err);
        setOriginal(null);
      } finally {
        setLoading(false);
      }
    };

    fetchThumbnail();
  }, [selectedVideo]);

  // Helper: convert hex color to RGB
  const hexToRgb = (hex: string) => {
    const sanitized = hex.replace("#", "");
    const bigint = parseInt(sanitized, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  // Binarize whenever threshold or color changes
  useEffect(() => {
    if (!original) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = original;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const targetColor = hexToRgb(color);

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculate distance to selected color
        const distance = Math.sqrt(
          Math.pow(r - targetColor.r, 2) +
            Math.pow(g - targetColor.g, 2) +
            Math.pow(b - targetColor.b, 2)
        );

        // If distance is less than threshold, turn pixel white; else black
        const value = distance <= threshold ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = value;
      }

      ctx.putImageData(imageData, 0, 0);
      setBinarized(canvas.toDataURL("image/png"));
    };
  }, [threshold, color, original]); // <--- watch both threshold & color

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
