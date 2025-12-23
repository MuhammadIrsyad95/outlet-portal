export const runtime = "nodejs"

import { importLocations } from "@/lib/importLocations"

export default async function Page() {
  await importLocations()
  return <h1>IMPORT OK</h1>
}
