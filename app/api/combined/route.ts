// app/api/combined/route.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const [res1, res2, res3, res4] = await Promise.all([
    fetch(`${API_BASE}/endpoint1`), //endpoints will be the api ones from backend
    fetch(`${API_BASE}/endpoint2`),
    fetch(`${API_BASE}/endpoint3`),
    fetch(`${API_BASE}/endpoint4`),
  ]);

  const [data1, data2, data3, data4] = await Promise.all([
    res1.json(),
    res2.json(),
    res3.json(),
    res4.json(),
  ]);

  return Response.json({ data1, data2, data3, data4 });
}
