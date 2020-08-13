import { move, mapFilter } from './arrayOps.js'
describe('array ops', () => {
  describe('move', () => {
    const testArray = Object.freeze([1, 2, 3, 4, 5, 6])

    it('moves array element up and original is not changed', () => {
      expect(move(testArray, 0, 'up')).toStrictEqual([2, 1, 3, 4, 5, 6])
      expect(testArray).toStrictEqual([1, 2, 3, 4, 5, 6])
    })

    it('moving the first element down does not change anything', () => {
      expect(move(testArray, 0, 'down')).toStrictEqual([1, 2, 3, 4, 5, 6])
    })

    it('moving the last element up does not change anything', () => {
      expect(move(testArray, testArray.length - 1, 'up')).toStrictEqual([1, 2, 3, 4, 5, 6])
    })

    it('moves element to last position', () => {
      expect(move(testArray, testArray.length - 2, 'up')).toStrictEqual([1, 2, 3, 4, 6, 5])
    })

    it('moves element up', () => {
      expect(move(testArray, 3, 'up')).toStrictEqual([1, 2, 3, 5, 4, 6])
    })

    it('moves element down', () => {
      expect(move(testArray, 1, 'down')).toStrictEqual([2, 1, 3, 4, 5, 6])
    })
  })

  describe('mapFilter', () => {
    it('doubles numbers and filters strings', () => {
      const input = [1, 2, 3, '4', 5]
      const result = mapFilter(input, (element) => typeof element === 'string' ? undefined : element * 2)
      expect(result).toStrictEqual([2, 4, 6, 10])
    })
  })
})
