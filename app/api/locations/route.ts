import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

export async function GET() {
  const locations = await prisma.location.findMany({
    where: {
      lat: { not: null },
      lng: { not: null },
    },
    select: {
      id: true,
      name: true,
      chain: true,
      lat: true,
      lng: true,
    },
  })

  return NextResponse.json(locations)
}
