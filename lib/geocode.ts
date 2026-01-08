export async function geocodeAddress(address: string) {
  const url =
    "https://nominatim.openstreetmap.org/search?" +
    new URLSearchParams({
      q: address,
      format: "json",
      limit: "1",
    })

  const res = await fetch(url, {
    headers: {
      "User-Agent": "outlet-mapping/1.0",
    },
  })

  const data = await res.json()

  if (!data.length) return null

  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
  }
}
