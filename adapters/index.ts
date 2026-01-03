import { normalizeAll } from "./normalizeAll"

import sevenEleven from "@/data/7eleven_malaysia.json"
import kfc from "@/data/kfc_malaysia.json"
import mcd from "@/data/mcd_malaysia.json"
import watsons from "@/data/watsons_my.json"
import starbucks from "@/data/starbucks_malaysia.json"
import subway from "@/data/subway_malaysia.json"
import mynews from "@/data/mynews_my.json"

export const adapters = [
  () => normalizeAll(sevenEleven, "7-Eleven", "Convenience"),
  () => normalizeAll(kfc, "KFC", "Fast Food"),
  () => normalizeAll(mcd, "McDonald's", "Fast Food"),
  () => normalizeAll(watsons, "Watsons", "Pharmacy"),
  () => normalizeAll(starbucks, "Starbucks", "Beverage"),
  () => normalizeAll(subway, "Subway", "Fast Food"),
  () => normalizeAll(mynews, "myNEWS", "Convenience"),
]
