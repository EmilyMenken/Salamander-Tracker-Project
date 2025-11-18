import VideoList from "./components/VideoList"
import Thumbnail from "./components/Thumbnail"
import JobStatus from "./components/JobStatus"
import Process from "./components/Process"

// app/dashboard/page.tsx
export default async function DashboardPage() {

  return (
    <main>
      <h1>Dashboard</h1>

      <VideoList />
      <Thumbnail />
      <Process />
      <JobStatus />

    </main>
  );
}

