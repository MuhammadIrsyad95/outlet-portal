import { runGeocoding } from "@/lib/runGeocoding"

export default async function Page() {
  await runGeocoding()
  return <h1>Geocoding finished</h1>
}
