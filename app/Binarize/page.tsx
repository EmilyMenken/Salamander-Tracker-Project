"use client";
import { useState } from "react";
import Color from "../components/Color";
import Thumbnail from "../components/Thumbnail";

export default function BinarizePage() {
  const [color, setColor] = useState("#ff0000");
  const [threshold, setThreshold] = useState(100);

  return (
    <div>
      <Color
        color={color}
        threshold={threshold}
        onColorChange={setColor}
        onThresholdChange={setThreshold}
      />
      <Thumbnail
        videos={videos}
        selectedVideoId={selectedVideoId}
        color={color}
        threshold={threshold}
      />
    </div>
  );
}
