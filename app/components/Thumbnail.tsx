"use client";

import { useEffect, useState } from "react";

export default function Thumbnail() {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const url = "http://localhost:3000/api/thumbnail/ensantina.mp4";
    setThumbnail(url);
  }, []);

  return (
    <div>
      {thumbnail && <img src={thumbnail} />}
    </div>
  );
}
