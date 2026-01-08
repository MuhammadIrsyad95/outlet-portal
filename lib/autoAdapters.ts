import path from "path"
import fs from "fs"
import { normalizeAll } from "./normalizeAll"

const DATA_DIR = path.join(process.cwd(), "data")

/**
 * Convert filename to human-readable chain name
 * example: "kfc_malaysia.json" → "KFC"
 */
function filenameToChainName(filename: string) {
  return filename
    .replace("_malaysia", "")
    .replace("_my", "")
    .replace("_full", "")
    .replace(".json", "")
    .split("_")
    .map(w => w.toUpperCase())
    .join(" ")
}

/**
 * Simple category guess (optional)
 */
function guessCategory(chain: string) {
  const c = chain.toLowerCase()

  if (c.includes("mart") || c.includes("news") || c.includes("7")) return "Convenience"
  if (c.includes("coffee") || c.includes("starbucks") || c.includes("tealive")) return "Beverage"
  if (c.includes("pharmacy") || c.includes("guardian") || c.includes("watsons")) return "Pharmacy"
  return "Food"
}

export function loadAllAdapters() {
  const files = fs
    .readdirSync(DATA_DIR)
    .filter(f => f.endsWith(".json"))

  return files.map(file => {
    const raw = require(path.join(DATA_DIR, file))
    const chain = filenameToChainName(file)
    const category = guessCategory(chain)

    return () => normalizeAll(raw, chain, category)
  })
}
