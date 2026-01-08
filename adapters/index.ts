import fs from "fs"
import path from "path"
import { normalizeAll } from "./normalizeAll"

const DATA_DIR = path.join(process.cwd(), "data")

/**
 * Convert filename → clean chain name
 */
function filenameToChainName(filename: string) {
  return filename
    .replace(".json", "")
    .replace("_malaysia", "")
    .replace("_my", "")
    .replace("_full", "")
    .split("_")
    .map(w => w.toUpperCase())
    .join(" ")
}

/**
 * Simple category guess
 */
function guessCategory(chain: string) {
  const c = chain.toLowerCase()

  if (c.includes("mart") || c.includes("news") || c.includes("7")) return "Convenience"
  if (c.includes("coffee") || c.includes("starbucks") || c.includes("tealive")) return "Beverage"
  if (c.includes("watsons") || c.includes("guardian")) return "Pharmacy"
  return "Food"
}

export const adapters = fs
  .readdirSync(DATA_DIR)
  .filter(f => f.endsWith(".json"))
  .map(file => {
    const fullPath = path.join(DATA_DIR, file)
    const raw = JSON.parse(fs.readFileSync(fullPath, "utf-8"))

    const chain = filenameToChainName(file)
    const category = guessCategory(chain)

    return () => normalizeAll(raw, chain, category)
  })
