"use client";

type Video = {
  id: string;
  name: string;
  url: string;
};

export default function VideoList({ videos }: { videos: Video[] }) {
  return (
    <div>
      <pre>{JSON.stringify(videos, null, 2)}</pre>

      {videos.map(v => (
        <div key={v.id} style={{ marginBottom: "20px" }}>
          <p>{v.name}</p>
          <video src={v.url} width={300} controls />
        </div>
      ))}
    </div>
  );
}
