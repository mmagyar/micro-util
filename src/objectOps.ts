export const forEach = <T>(obj: { [s: string]: T },
  callback: (value: T, key: string, index: number) => void): void => {
  let i = 0
  for (const key of Object.keys(obj)) {
    callback(obj[key], key, i)
    i += 1
  }
}

export const count = <T>(obj: { [s: string]: T }): number => Object.keys(obj).length
export const map = <T, K>(obj: { [s: string]: T },
  callback: (value: T, key: string, index: number) => K
): { [s: string]: K } => {
  let i = 0
  const result: { [s: string]: K } = {}

  for (const key of Object.keys(obj)) {
    result[key] = callback(obj[key], key, i)
    i += 1
  }

  return result
}

export const mapToArray = <T, K>(obj: { [s: string]: T },
  callback: (value: T, key: string, index: number) => K): K[] => {
  let i = 0
  const result: K[] = []

  for (const key of Object.keys(obj)) {
    result.push(callback(obj[key], key, i))
    i += 1
  }

  return result
}

export const every = <T>(obj: { [s: string]: T },
  callback: (value: T, key: string, index: number) => boolean): boolean => {
  let i = 0

  for (const key of Object.keys(obj)) {
    if (callback(obj[key], key, i) !== true) return false
    i += 1
  }

  return true
}

export const mapToObject = <K, E>(
  input: Iterable<E>, idProp: keyof E, transform: ((arg0: E) => K)):
    {[id: string]: K} => {
  const result: {[id: string]: K} = {}
  for (const value of input) {
    const id = value[idProp] as any
    result[id] = transform(value)
  }
  return result
}

export const arrayToObject = < E extends unknown>(input: Iterable<E>, idProp: keyof E):
    {[id: string]: E} => {
  const result: {[id: string]: E} = {}
  for (const value of input) {
    const id = value[idProp] as any
    result[id] = value
  }
  return result
}
