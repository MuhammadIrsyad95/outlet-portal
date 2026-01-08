import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

const PAGE_SIZE = 50

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page?: string
    chain?: string
    geo?: string
    q?: string
  }
}) {
  const page = Number(searchParams.page ?? 1)
  const skip = (page - 1) * PAGE_SIZE

  const chain = searchParams.chain ?? ""
  const geo = searchParams.geo ?? ""
  const q = searchParams.q ?? ""

  // =========================
  // BUILD WHERE
  // =========================
  const andConditions: Prisma.LocationWhereInput[] = []

  if (chain) {
    andConditions.push({ chain })
  }

  if (geo === "yes") {
    andConditions.push({
      lat: { not: null },
      lng: { not: null },
    })
  }

  if (geo === "no") {
    andConditions.push({
      OR: [{ lat: null }, { lng: null }],
    })
  }

  if (q) {
    andConditions.push({
      OR: [
        { name: { contains: q } },
        { address: { contains: q } },
      ],
    })
  }

  const where: Prisma.LocationWhereInput =
    andConditions.length > 0
      ? { AND: andConditions }
      : {}

  // =========================
  // QUERIES
  // =========================
  const [locations, total, chainGroups] = await Promise.all([
    prisma.location.findMany({
      where,
      skip,
      take: PAGE_SIZE,
      orderBy: { id: "asc" },
    }),
    prisma.location.count({ where }),

    // 🔥 IMPORTANT: GLOBAL CHAIN LIST (NO FILTER)
    prisma.location.groupBy({
      by: ["chain"],
      orderBy: { chain: "asc" },
    }),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-4">
      {/* FILTER BAR */}
      <form className="bg-white border rounded-lg p-4 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs mb-1">Chain</label>
          <select
            name="chain"
            defaultValue={chain}
            className="border rounded px-3 py-2 text-sm min-w-[180px]"
          >
            <option value="">All Chains</option>
            {chainGroups.map(c => (
              <option key={c.chain} value={c.chain}>
                {c.chain}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs mb-1">Geo</label>
          <select
            name="geo"
            defaultValue={geo}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">All</option>
            <option value="yes">With Lat/Lng</option>
            <option value="no">No Lat/Lng</option>
          </select>
        </div>

        <div className="flex-1 min-w-[240px]">
          <label className="block text-xs mb-1">Search</label>
          <input
            name="q"
            defaultValue={q}
            placeholder="Name or address"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded text-sm"
        >
          Apply
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white border rounded-lg overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100 border-b">
            <tr>
              <th className="px-3 py-2 text-left">Chain</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Address</th>
              <th className="px-3 py-2 text-center">Lat</th>
              <th className="px-3 py-2 text-center">Lng</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(loc => (
              <tr key={loc.id} className="border-t hover:bg-zinc-50">
                <td className="px-3 py-2 font-medium">{loc.chain}</td>
                <td className="px-3 py-2">{loc.name}</td>
                <td className="px-3 py-2 max-w-lg truncate">
                  {loc.address}
                </td>
                <td className="px-3 py-2 text-center">
                  {loc.lat ?? "—"}
                </td>
                <td className="px-3 py-2 text-center">
                  {loc.lng ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2">
        {page > 1 && (
          <a
            href={`/?page=${page - 1}&chain=${chain}&geo=${geo}&q=${q}`}
            className="px-3 py-1 border rounded bg-white text-sm"
          >
            Prev
          </a>
        )}
        {page < totalPages && (
          <a
            href={`/?page=${page + 1}&chain=${chain}&geo=${geo}&q=${q}`}
            className="px-3 py-1 border rounded bg-white text-sm"
          >
            Next
          </a>
        )}
      </div>
    </main>
  )
}
