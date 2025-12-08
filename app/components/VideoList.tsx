"use client";

type Video = {
  id: string;
  name: string;
  url: string;
  backend?: boolean;
  removed?: boolean;
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
        >
          <video src={v.url} />
          <p>{v.name}</p>
          {onRemove && (
            <button onClick={() => onRemove(v.id)}>
              {v.backend ? "Remove from dashboard" : "Delete"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
