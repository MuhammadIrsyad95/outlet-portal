/* eslint-disable @typescript-eslint/no-explicit-any */

export type AdapterConfig = {
  chain: string
  category: string
  nameField?: string
  latField?: string
  lngField?: string
  addressBuilder: (x: any) => string
}

export function adaptGeneric(raw: any[], cfg: AdapterConfig) {
  return raw
    .map(x => {
      const lat = cfg.latField ? Number(x[cfg.latField]) : null
      const lng = cfg.lngField ? Number(x[cfg.lngField]) : null

      return {
        chain: cfg.chain,
        category: cfg.category,
        name: cfg.nameField ? x[cfg.nameField] : cfg.chain,
        address: cfg.addressBuilder(x),
        lat: Number.isFinite(lat) ? lat : null,
        lng: Number.isFinite(lng) ? lng : null,
      }
    })
    .filter(x => x.address && x.name)
}
