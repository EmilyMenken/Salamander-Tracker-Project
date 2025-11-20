"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Color from "../components/Color";
import Thumbnail from "../components/Thumbnail";

export default function BinarizePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const videoId = searchParams.get("videoId");

  const [color, setColor] = useState("#ff0000");
  const [threshold, setThreshold] = useState(100);

  const handleColorChange = useCallback((c: string, t: number) => {
    setColor(c);
    setThreshold(t);
  }, []);

  const handleContinue = () => {
    if (!videoId) return;
    router.push(`/process?videoId=${videoId}`);
  };

  if (!videoId) {
    return <div>No video selected.</div>;
  }

  return (
    <div>
      <Color onChange={handleColorChange} />

      <Thumbnail
        videoId={videoId}
        color={color}
        threshold={threshold}
      />

      <button onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
