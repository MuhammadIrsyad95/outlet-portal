// app/api/geocode/route.ts
import { runGeocoding } from "@/lib/runGeocoding"

export async function POST() {
  console.log("🌍 GEOCODE API TRIGGERED")
  await runGeocoding()
  return Response.json({ ok: true })
}
