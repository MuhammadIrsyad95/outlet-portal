/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma"
import { adapt99Speedmart } from "@/adapters/99speedmart"

export async function importLocations() {
  const data = adapt99Speedmart()

  await prisma.location.deleteMany()

  for (const row of data) {
    await prisma.location.create({ data: row })
  }

  console.log("Imported:", data.length)
}
