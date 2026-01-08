import { prisma } from "@/lib/prisma"
import { getNeedGeocode } from "./getNeedGeocode"
import { geocodeAddress } from "./geocode"

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

export async function runGeocoding() {
  const rows = await getNeedGeocode()
  console.log("Need geocode:", rows.length)

  for (const row of rows) {
    try {
      const geo = await geocodeAddress(row.address!)

      if (geo) {
        await prisma.location.update({
          where: { id: row.id },
          data: {
            lat: geo.lat,
            lng: geo.lng,
          },
        })
        console.log("OK:", row.id)
      } else {
        console.log("NOT FOUND:", row.id)
      }

      // ⛔ WAJIB delay (aturan Nominatim)
      await sleep(1200)

    } catch (e) {
      console.error("ERROR:", row.id, e)
      await sleep(2000)
    }
  }

  console.log("✅ Geocoding finished")
}
