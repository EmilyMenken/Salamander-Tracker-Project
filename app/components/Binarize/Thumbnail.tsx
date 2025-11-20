"use client";

import { useEffect, useState } from "react";

interface ThumbProps {
  color: string;
  threshold: number;
}

export default function Thumbnail({ color, threshold }: ThumbProps) {
  const [original, setOriginal] = useState<string | null>(null);
  const [binarized, setBinarized] = useState<string | null>(null);

  // Load original thumbnail once
  useEffect(() => {
    setOriginal("http://localhost:3000/api/thumbnail/ensantina.mp4");
  }, []);

  // Load binarized thumbnail whenever color/threshold changes
  useEffect(() => {
    const url =
      `http://localhost:3000/api/binarize/ensantina.mp4`
      + `?color=${encodeURIComponent(color)}`
      + `&threshold=${threshold}`;

    setBinarized(url);
  }, [color, threshold]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {original && (
        <div>
          <h3>Original</h3>
          <img src={original} width={200} />
        </div>
      )}

      {binarized && (
        <div>
          <h3>Binarized</h3>
          <img src={binarized} width={200} />
        </div>
      )}
    </div>
  );
}
