"use client"

export const dynamic = "force-dynamic"

export default function Page() {
  async function runImport() {
    await fetch("/api/import", { method: "POST" })
    alert("Import finished")
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Import Data</h1>
      <button onClick={runImport}>
        Run Import
      </button>
    </div>
  )
}
