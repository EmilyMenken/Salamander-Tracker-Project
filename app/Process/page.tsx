"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Job = {
  jobId: string;
  fileName: string;
  targetColor: string;
  threshold: number;
  status: string;
  result?: string;
};

export default function ProcessPage() {
  const searchParams = useSearchParams();
  
  // Accept original full video URL
  const videoUrl = searchParams.get("videoUrl");

  // Extract file name from it
  const videoName = videoUrl ? videoUrl.split("/").pop() : null;

  const targetColor = searchParams.get("targetColor") || "#ff0000";
  const threshold = Number(searchParams.get("threshold") || 100);

  const [job, setJob] = useState<Job | null>(null);
  const [status, setStatus] = useState("starting...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoName) {
      setError("No video name provided");
      return;
    }

    let interval: NodeJS.Timer;

    const startJob = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/process/${encodeURIComponent(videoName)}?targetColor=${encodeURIComponent(targetColor)}&threshold=${threshold}`,
          { method: "POST" }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server error: ${res.status} - ${text}`);
        }

        const data: Job = await res.json();
        setJob(data);
        setStatus(data.status);

        interval = setInterval(async () => {
          try {
            const statusRes = await fetch(
              `http://localhost:3000/api/process/${data.jobId}/status`
            );
            const statusData = await statusRes.json();
            setStatus(statusData.status);

            if (statusData.status === "done" || statusData.status === "error") {
              clearInterval(interval);
              setJob(prev => prev ? { ...prev, result: statusData.result } : prev);
            }
          } catch (err) {
            clearInterval(interval);
            setError("Failed to fetch job status");
          }
        }, 2000);
      } catch (err: any) {
        setError(err.message);
      }
    };

    startJob();

    return () => clearInterval(interval);
  }, [videoName, targetColor, threshold]);

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!job) return <p>Starting processing...</p>;

  return (
    <div>
      <h1>Processing Video: {job.fileName}</h1>
      <p>Status: {status}</p>
      <p>Video Name: {videoName}</p>
      <p>Target Color: {targetColor}</p>
      <p>Threshold: {threshold}</p>

      {job.result && (
      <div>
          <a
            href={`http://localhost:3000/results/${job.result.split('/').pop()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Download Result</button>
          </a>
        </div>
      )}
    </div>
  );

}
