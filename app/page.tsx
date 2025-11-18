import Image from "next/image";
import VideoList from "./components/VideoList"

// app/dashboard/page.tsx
export default async function DashboardPage() {

  return (
    <main>
      <h1>Dashboard</h1>

      <VideoList />
      
    </main>
  );
}

