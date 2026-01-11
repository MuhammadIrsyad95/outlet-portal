"use client"

export const dynamic = "force-dynamic"

export default function Page() {
  async function runGeocode() {
    await fetch("/api/geocode", { method: "POST" })
    alert("Geocoding finished")
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Geocode</h1>
      <button onClick={runGeocode}>
        Run Geocoding
      </button>
    </div>
  )
}
