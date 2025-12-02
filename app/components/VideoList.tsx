"use client";

type Video = {
  id: string;
  name: string;
  url: string;
  backend?: boolean;
};

export default function VideoList({
  videos,
  onRemove,
}: {
  videos: Video[];
  onRemove?: (id: string) => void;
}) {
  return (
    <div>
      {videos.map(v => (
        <div
          key={v.id}
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <p>{v.name}</p>
            <video src={v.url} width={300} controls />
          </div>
          {onRemove && (
            <button onClick={() => onRemove(v.id)}>Remove</button>
          )}
        </div>
      ))}
    </div>
  );
}
