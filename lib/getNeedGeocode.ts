import { prisma } from "@/lib/prisma"

export async function getNeedGeocode() {
  return prisma.location.findMany({
    where: {
      OR: [{ lat: null }, { lng: null }],
      address: { not: "" },
    },
    select: {
      id: true,
      address: true,
    },
  })
}
