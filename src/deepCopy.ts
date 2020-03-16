
export const deepCopy = <T>(obj: T): T => {
  let copy: any = null

  // Handle the 3 simple types, and null or undefined
  // eslint-disable-next-line eqeqeq
  if (obj == null || typeof obj !== 'object') return obj

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  if (obj instanceof Array) {
    copy = []
    for (let i = 0, len = obj.length; i < len; i += 1) { copy[i] = deepCopy(obj[i]) }

    return copy
  }

  if (obj instanceof RegExp) return obj

  if (obj instanceof Object) {
    copy = {}
    for (const attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) { copy[attr] = deepCopy(obj[attr]) }
    }

    return copy
  }

  throw new Error("Unable to copy obj! Its type isn't supported.")
}
