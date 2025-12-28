/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma"
import { adapt99Speedmart } from "@/adapters/99speedmart"
import { adapt7Eleven } from "@/adapters/7eleven"

export async function importLocations() {
  const allData = [
    ...adapt99Speedmart(),
    ...adapt7Eleven(),
  ]

  if (allData.length === 0) return

  // ambil daftar chain unik
  const chains = Array.from(new Set(allData.map(d => d.chain)))

  // hapus hanya chain yg akan di-import ulang
  await prisma.location.deleteMany({
    where: {
      chain: { in: chains },
    },
  })

  // insert satu per satu (aman utk Prisma versi kamu)
  for (const row of allData) {
    await prisma.location.create({
      data: row,
    })
  }

  console.log("Imported:", allData.length, "chains:", chains)
}
