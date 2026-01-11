import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

const PAGE_SIZE = 50

export default async function Home(props: {
  searchParams: Promise<{
    page?: string
    chain?: string
    category?: string
  }>
}) {
  const searchParams = await props.searchParams

  const page = Number(searchParams.page ?? 1)
  const skip = (page - 1) * PAGE_SIZE

  const chain = searchParams.chain ?? ""
  const category = searchParams.category ?? ""

  // =========================
  // WHERE (CHAIN + CATEGORY)
  // =========================
  const andConditions: Prisma.LocationWhereInput[] = []

  if (chain) {
    andConditions.push({ chain })
  }

  if (category) {
    andConditions.push({ category })
  }

  const where: Prisma.LocationWhereInput =
    andConditions.length > 0
      ? { AND: andConditions }
      : {}

  // =========================
  // QUERIES
  // =========================
  const [locations, total, chainGroups, categoryGroups] =
    await Promise.all([
      prisma.location.findMany({
        where,
        skip,
        take: PAGE_SIZE,
        orderBy: { id: "asc" },
      }),
      prisma.location.count({ where }),

      // dropdown chain
      prisma.location.groupBy({
        by: ["chain"],
        orderBy: { chain: "asc" },
      }),

      // dropdown category
      prisma.location.groupBy({
        by: ["category"],
        orderBy: { category: "asc" },
      }),
    ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-4">
      {/* FILTER BAR */}
      <form className="bg-white border rounded-lg p-4 flex flex-wrap gap-4 items-end">
        {/* CHAIN */}
        <div>
          <label className="block text-xs mb-1">Chain</label>
          <select
            name="chain"
            defaultValue={chain}
            className="border rounded px-3 py-2 text-sm min-w-[220px]"
          >
            <option value="">All Chains</option>
            {chainGroups.map(c => (
              <option key={c.chain} value={c.chain}>
                {c.chain}
              </option>
            ))}
          </select>
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-xs mb-1">Category</label>
          <select
            name="category"
            defaultValue={category}
            className="border rounded px-3 py-2 text-sm min-w-[180px]"
          >
            <option value="">All Categories</option>
            {categoryGroups.map(c => (
              <option key={c.category} value={c.category}>
                {c.category}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded text-sm"
        >
          Apply
        </button>
      </form>

      {/* TABLE (DATATABLE STYLE) */}
      <div className="bg-white border rounded-lg overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100 border-b">
            <tr>
              <th className="px-3 py-2 text-left">Chain</th>
              <th className="px-3 py-2 text-left">Category</th>
              <th className="px-3 py-2 text-left">Outlet Name</th>
              <th className="px-3 py-2 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(loc => (
              <tr
                key={loc.id}
                className="border-t hover:bg-zinc-50"
              >
                <td className="px-3 py-2 font-medium">
                  {loc.chain}
                </td>
                <td className="px-3 py-2">
                  {loc.category}
                </td>
                <td className="px-3 py-2">
                  {loc.name}
                </td>
                <td className="px-3 py-2 max-w-lg truncate">
                  {loc.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between text-sm">
        <div>
          Showing {skip + 1}–
          {Math.min(skip + PAGE_SIZE, total)} of {total}
        </div>

        <div className="flex gap-2">
          {page > 1 && (
            <a
              href={`/?page=${page - 1}&chain=${chain}&category=${category}`}
              className="px-3 py-1 border rounded bg-white"
            >
              Prev
            </a>
          )}
          {page < totalPages && (
            <a
              href={`/?page=${page + 1}&chain=${chain}&category=${category}`}
              className="px-3 py-1 border rounded bg-white"
            >
              Next
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
