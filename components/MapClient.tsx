"use client"

import { useEffect, useState } from "react"
import type { LatLngExpression } from "leaflet"
import FixMapSize from "./FixMapSize"
import MapLegend from "./MapLegend"

type Location = {
  id: number
  name: string
  chain: string
  lat: number | null
  lng: number | null
}

type ReactLeafletModule = typeof import("react-leaflet")

/**
 * Generate consistent color per chain (NO hardcode)
 */
function stringToColor(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return `hsl(${hash % 360}, 70%, 50%)`
}

export default function MapClient() {
  const [locations, setLocations] = useState<Location[]>([])
  const [leaflet, setLeaflet] = useState<ReactLeafletModule | null>(null)

  useEffect(() => {
    // Load data
    fetch("/api/locations")
      .then(res => res.json())
      .then(setLocations)

    // Load leaflet ONLY on client
    import("react-leaflet").then(setLeaflet)
  }, [])

  if (!leaflet) {
    return <p style={{ padding: 20 }}>Loading map…</p>
  }

  const { MapContainer, TileLayer, CircleMarker, Popup } = leaflet

  const center: LatLngExpression = [3.139, 101.6869] // Malaysia center

  const chains = Array.from(new Set(locations.map(l => l.chain)))

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      > 
      
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {locations.map(loc =>
          loc.lat && loc.lng ? (
                <CircleMarker
                key={loc.id}
                center={[loc.lat, loc.lng]}
                radius={5}
                pathOptions={{
                    color: stringToColor(loc.chain),
                    fillColor: stringToColor(loc.chain),
                    fillOpacity: 0.8,
                    weight: 1,
                }}
                >
                <Popup>
                    <strong>{loc.name}</strong>
                    <br />
                    {loc.chain}
                </Popup>
                </CircleMarker>
          ) : null
        )}
          <MapLegend chains={chains} getColor={stringToColor} />

      </MapContainer>

 
    </div>
  )
}
