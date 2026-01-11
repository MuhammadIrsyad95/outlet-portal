"use client"

import { useEffect, useState } from "react"

export default function Page() {
  const [status, setStatus] = useState("Running...")

  useEffect(() => {
    async function run() {
      try {
        const res = await fetch("/api/import", {
          method: "POST",
        })

        if (!res.ok) {
          throw new Error("API error: " + res.status)
        }

        const data = await res.json()
        console.log("API RESPONSE:", data)

        setStatus("Import finished")
      } catch (err) {
        console.error("FETCH FAILED:", err)
        setStatus("Import failed ❌ (check console)")
      }
    }

    run()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Import Data</h1>
      <p>Status: {status}</p>
    </div>
  )
}

// === FOR LOCAL ONLY"
// import { importLocations } from "@/lib/importLocations"

// export default async function ImportPage() {
//   await importLocations()
//   return <h1>Import completed</h1>
// }
