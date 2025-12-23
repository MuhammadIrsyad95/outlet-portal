import raw from "@/data/99speedmart_my.json"
import { adaptGeneric } from "./generic"

export function adapt99Speedmart() {
  return adaptGeneric(raw, {
    chain: "99 Speedmart",
    category: "Convenience",
    nameField: "store_name",
    addressBuilder: x => x.address,
  })
}
