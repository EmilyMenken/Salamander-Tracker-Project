"use client";

import { useState, useEffect } from "react";

type Job = {
  id: string;
  fileName: string;
  targetColor: string;
  threshold: number;
  status: string;
  csvUrl?: string;
};

export default function ProcessPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/session-jobs"); // replace with your API
        const data: Job[] = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>Processing Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs processed yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p><strong>File:</strong> {job.fileName}</p>
            <p><strong>Target Color:</strong> {job.targetColor}</p>
            <p><strong>Threshold:</strong> {job.threshold}</p>
            <p><strong>Status:</strong> {job.status}</p>
            {job.csvUrl && (
              <p>
                <strong>CSV:</strong>{" "}
                <a href={job.csvUrl} download target="_blank" rel="noopener noreferrer">Download CSV</a>
              </p>
            )}
          </div>
        ))
      )}
    </main>
  );
}
