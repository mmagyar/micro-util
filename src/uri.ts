export const serialize = (obj: {[key: string]: any}, prefix?: string): string =>
  Object.keys(obj).map(p => {
    const k = prefix ? `${prefix}[${p}]` : p
    const v = obj[p]
    return v !== null && typeof v === 'object' ? serialize(v, k)
      : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
  }).join('&')
