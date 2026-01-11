// app/api/import/route.ts
export const runtime = "nodejs"

import { importLocations } from "@/lib/importLocations"

export async function POST() {
  console.log("🚀 IMPORT API TRIGGERED")

  try {
    await importLocations()

    return Response.json({ ok: true })
  } catch (err) {
    console.error("❌ IMPORT ERROR", err)

    return Response.json(
      { ok: false, error: String(err) },
      { status: 500 }
    )
  }
}
