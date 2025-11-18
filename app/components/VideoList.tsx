"use client";

import { useEffect, useState } from "react";

type Video = {
  id: string;
  fileName: string;
};

export default function VideoList() {

  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("/api/videos");
      const data: Video[] = await res.json();
      setVideos(data);
    };

    fetchVideos();
  }, []);

  return (
    <pre>{JSON.stringify(videos, null, 2)}</pre>
  );
}