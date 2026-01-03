/* eslint-disable @typescript-eslint/no-explicit-any */

export type NormalizedLocation = {
  name: string
  chain: string
  category: string
  address: string          // ⬅️ WAJIB STRING
  lat: number | null
  lng: number | null
  geo_status: "OK" | "NEED_GEOCODE"
}

export function normalizeAll<T extends Record<string, unknown>>(
  raw: T[],
  chainName: string,
  category: string
): NormalizedLocation[] {
  return raw.map((x: any) => {
    // =========================
    // LAT / LNG
    // =========================
    const lat =
      toNumber(
        x.lat ??
        x.latitude ??
        extractFromMapUrl(x.maps_url)?.lat ??
        extractFromMapUrl(x.map_url)?.lat
      )

    const lng =
      toNumber(
        x.lng ??
        x.longitude ??
        extractFromMapUrl(x.maps_url)?.lng ??
        extractFromMapUrl(x.map_url)?.lng
      )

    // =========================
    // NAME
    // =========================
    const name =
      x.name ||
      x.store_name ||
      x.outlet ||
      x.branch ||
      chainName

    // =========================
    // ADDRESS (PASTI STRING)
    // =========================
    const address =
      x.address ||
      x.address_raw ||
      [
        x.street,
        x.city,
        x.state,
        x.postcode,
        x.country,
      ].filter(Boolean).join(", ") ||
      "-"   // ⬅️ fallback WAJIB STRING

    return {
      name: String(name).trim(),
      chain: chainName,
      category,
      address,              // ⬅️ tidak pernah null
      lat: lat ?? null,
      lng: lng ?? null,
      geo_status: lat && lng ? "OK" : "NEED_GEOCODE",
    }
  })
}

// =========================
// HELPERS
// =========================
function toNumber(v: any): number | null {
  const n = Number(v)
  return isNaN(n) ? null : n
}

function extractFromMapUrl(url?: string) {
  if (!url) return null
  const match = url.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/)
  if (!match) return null
  return {
    lat: Number(match[1]),
    lng: Number(match[2]),
  }
}
