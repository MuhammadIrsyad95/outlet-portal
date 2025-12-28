/* eslint-disable @typescript-eslint/no-explicit-any */

import raw from "../data/7eleven_malaysia.json"
import { adaptGeneric } from "./generic"

export function adapt7Eleven() {
  return adaptGeneric(raw as any[], {
    chain: "7-Eleven",
    category: "Convenience",
    nameField: "name",
    latField: "lat",
    lngField: "lng",
    addressBuilder: (x: any) =>
      `${x.street}, ${x.city}, ${x.state}, ${x.postcode}, ${x.country ?? "Malaysia"}`,
  })
}
