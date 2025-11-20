// test with working jobID later

"use client";

import { useEffect, useState } from "react";

type Props = {
  jobId: string;
};

export default function JobStatus({ jobId }: Props) {
  const [status, setStatus] = useState<string>("loading...");

  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/process/${jobId}/status`
        );

        const data = await res.json();
        setStatus(data.status);

        // Stop polling if job is done
        if (data.status === "finished" || data.status === "not_found") {
          clearInterval(interval);
        }
      } catch (err) {
        setStatus("error");

        console.log(err);
        // show to user later

        clearInterval(interval);
      }
    }, 1000); // poll every 1 second

    // Cleanup when component unmounts
    return () => clearInterval(interval);
  }, [jobId]);

  return (
    <div>
      <p>Job ID: {jobId}</p>
      <p>Status: {status}</p>
    </div>
  );
}
