"use client";

import { useState } from "react";
import Color from "./Color";
import Thumbnail from "./Thumbnail";

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
        color={color}
        threshold={threshold}
      />
    </div>
  );
}
