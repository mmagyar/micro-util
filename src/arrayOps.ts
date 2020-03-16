export const mapFilter = <T, K>(
  arr: T[], callback: (value: T, index: number) => K | undefined): K[] => {
  const results: K[] = []
  for (let i = 0, l = arr.length; i < l; i += 1) {
    const result = callback(arr[i], i)
    if (result !== undefined) results.push(result)
  }

  return results
}

export const move = <T>(arrayInput: readonly T[], index: number, direction: 'up' | 'down'): T[] => {
  const array = [...arrayInput]
  const indexDir = index === 0 && direction === 'down'
  if (indexDir || index >= array.length) return array

  const newIndex = index + (direction === 'up' ? 1 : -1)
  if (newIndex < 0 || newIndex === array.length) return array
  const indexes = [index, newIndex].sort((a, b) => a - b)
  // Replace from lowest index, two elements, reverting the order
  array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]])
  return array
}
