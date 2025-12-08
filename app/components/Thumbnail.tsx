"use client";

import { useEffect, useState } from "react";

export default function Thumbnail({
  videoUrl,
  color,
  threshold,
}: {
  videoUrl: string;
  color: string;       // e.g. "#FF0000"
  threshold: number;   // 0–255
}) {
  const [original, setOriginal] = useState<string | null>(null);
  const [binarized, setBinarized] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Extract filename from video URL
  const fileName = decodeURIComponent(videoUrl.split("/").pop() || "");

  // Load original thumbnail from your API
  useEffect(() => {
    if (!videoUrl) {
      setOriginal(null);
      return;
    }

    const thumbnailUrl = `http://localhost:3000/api/thumbnail/${encodeURIComponent(fileName)}`;

    setLoading(true);
    setOriginal(thumbnailUrl);
    setLoading(false);
  }, [videoUrl]);

  // Convert hex → RGB
  function hexToRgb(hex: string) {
    const sanitized = hex.replace("#", "");
    const bigint = parseInt(sanitized, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  // Binarize when original, color, or threshold changes
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

        const distance = Math.sqrt(
          (r - targetColor.r) ** 2 +
          (g - targetColor.g) ** 2 +
          (b - targetColor.b) ** 2
        );

        const value = distance <= threshold ? 255 : 0;

        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
      }

      ctx.putImageData(imageData, 0, 0);
      setBinarized(canvas.toDataURL("image/png"));
    };
  }, [original, color, threshold]);

  return (
    <div>
      <div>
        {loading ? (
          <p>Loading thumbnail...</p>
        ) : original ? (
          <img src={original} width={300} alt="Original thumbnail" />
        ) : (
          <p>No thumbnail available</p>
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
