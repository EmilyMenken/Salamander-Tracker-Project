"use client";

type Video = {
  id: string;
  name: string;
  url: string;
};

export default function VideoList({ videos }: { videos: Video[] }) {
  return (
    <div>
      {videos.map(v => (
        <div key={v.id} style={{ marginBottom: "20px" }}>
          <p>{v.name}</p>
          <video
            key={v.id} // add key here as well just in case
            src={v.url}
            width={300}
            controls
          />
        </div>
      ))}
    </div>
  );
}
