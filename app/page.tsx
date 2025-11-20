import Image from "next/image";

// app/dashboard/page.tsx
export default async function DashboardPage() {
  {/* http://localhost:3000/api/process: */}

  {/* targetColor = hex number, threshold = 100 */}
  {/* http://localhost:3000/api/process/:fileName?targetColor=654321&threshold=100 */}

  {/* http://localhost:3000/api/thumbnail/:fileName */}
  {/* http://localhost:3000/api/videos */}
  {/* http://localhost:3000/api/process:jobIDnumber/status */}

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/combined`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <main>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}

