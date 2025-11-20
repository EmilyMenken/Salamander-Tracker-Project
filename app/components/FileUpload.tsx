"use client";
import { useState } from "react";

export default function FileUpload({ onAdd }: { onAdd: (file: File) => void }) {
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    onAdd(file);
    setFile(null);

    // Save videos to sessionStorage for other page access
    const stored = sessionStorage.getItem("videos");
    const currentVideos = stored ? JSON.parse(stored) : [];
    sessionStorage.setItem("videos", JSON.stringify([...currentVideos, { id: crypto.randomUUID(), name: file.name, url: URL.createObjectURL(file) }]));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="video/mp4"
          onChange={e => setFile(e.target.files?.[0] || null)}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
