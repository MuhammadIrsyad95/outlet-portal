import { prisma } from "@/lib/prisma"
import { adapters } from "@/adapters"

export async function importLocations() {
  console.log("🚀 Starting import...")

  const allData = adapters.flatMap(fn => fn())

  if (!allData.length) {
    console.log("No data to import")
    return
  }

  const chains = [...new Set(allData.map(d => d.chain))]

  // hapus data lama per chain
  await prisma.location.deleteMany({
    where: { chain: { in: chains } },
  })

  // 🚀 INSERT VIA TRANSACTION (TANPA geo_status)
  await prisma.$transaction(
    allData.map(({ geo_status, ...row }) =>
      prisma.location.create({
        data: row,
      })
    )
  )

  console.log(`✅ Imported ${allData.length} locations`)
}
