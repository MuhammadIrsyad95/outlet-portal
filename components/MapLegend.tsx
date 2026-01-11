"use client"

import { useEffect } from "react"
import { useMap } from "react-leaflet"
import L from "leaflet"

type Props = {
  chains: string[]
  getColor: (chain: string) => string
}

export default function MapLegend({ chains, getColor }: Props) {
  const map = useMap()

  useEffect(() => {
    if (!map) return

   const legend = new L.Control({ position: "bottomleft" })


    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "leaflet-legend")
      div.style.background = "white"
      div.style.padding = "10px"
      div.style.borderRadius = "6px"
      div.style.maxHeight = "220px"
      div.style.overflowY = "auto"
      div.style.fontSize = "12px"
      div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)"
      div.style.marginBottom = "80px"

      div.innerHTML = `<strong>Chains</strong><br/>`

      chains.forEach(chain => {
        const color = getColor(chain)
        div.innerHTML += `
          <div style="display:flex;align-items:center;margin-top:4px">
            <span style="
              width:10px;
              height:10px;
              background:${color};
              border-radius:50%;
              display:inline-block;
              margin-right:6px
            "></span>
            ${chain}
          </div>
        `
      })

      return div
    }

    legend.addTo(map)

    return () => {
      legend.remove()
    }
  }, [map, chains, getColor])

  return null
}
