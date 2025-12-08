"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Color from "../components/Color";
import Thumbnail from "../components/Thumbnail";

export default function BinarizePage() {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("url"); // GET THE VIDEO URL
  const router = useRouter();

  const [color, setColor] = useState("#ff0000");
  const [threshold, setThreshold] = useState(100);

  if (!videoUrl) {
    return <div>No video selected</div>;
  }

  const handleGoToProcess = () => {
    router.push(
      `/process?videoUrl=${encodeURIComponent(videoUrl)}&targetColor=${encodeURIComponent(
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

       {/* Selected video player at the top */}
      <video src={videoUrl} controls width={600} />

      
      <Thumbnail
        videoUrl={videoUrl} // PASS THE URL, NOT A VIDEO LIST
        color={color}
        threshold={threshold}
      />

      <button onClick={handleGoToProcess}>
        Go to Process Page
      </button>
    </div>
  );
}
