"use client"

import { useEffect } from "react"
import { useMap } from "react-leaflet"

export default function FixMapSize() {
  const map = useMap()

  useEffect(() => {
    // Delay dikit biar DOM settle
    setTimeout(() => {
      map.invalidateSize()
    }, 100)
  }, [map])

  return null
}
