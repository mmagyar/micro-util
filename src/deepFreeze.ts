export const deepFreeze = <T>(o: T|any): T => {
  Object.entries(o).forEach(([key, value]) => {
    o[key] = value && typeof value === 'object' ? deepFreeze(value) : value
  })
  return Object.freeze(o)
}
