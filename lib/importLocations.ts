import { prisma } from "@/lib/prisma"
import { adapters } from "@/adapters"

export async function importLocations() {
  console.log("🚀 Starting import...")

  const allData = adapters.flatMap(fn => fn())

  if (!allData.length) {
    console.log("❌ No data to import")
    return
  }

  const chains = [...new Set(allData.map(d => d.chain))]

  console.log(`📦 Chains: ${chains.length}`)
  console.log(`📍 Total records: ${allData.length}`)

  // hapus data lama per chain
  await prisma.location.deleteMany({
    where: { chain: { in: chains } },
  })

  // insert data
  await prisma.$transaction(
    allData.map(({ geo_status, ...row }) =>
      prisma.location.create({ data: row })
    )
  )

  console.log("✅ Import completed")
}
