import { forEach, count, map, mapToArray, every, mapToObject, arrayToObject } from './objectOps.js'
const exampleObject = Object.freeze({
  keyOne: 'ValueOne',
  keyTwo: 'ValueTwo',
  keyThree: 'ValueThree'
})
describe('forEach for objects', () => {
  it('iterates over objects with a callback', () => {
    const result: any = []
    forEach(exampleObject, (value, key, index) => result.push({ value, key, index }))
    expect(result).toHaveLength(3)
    expect(result[0]).toEqual({ value: 'ValueOne', key: 'keyOne', index: 0 })
    expect(result[1]).toEqual({ value: 'ValueTwo', key: 'keyTwo', index: 1 })
    expect(result[2]).toEqual({ value: 'ValueThree', key: 'keyThree', index: 2 })
  })
})

describe('count for objects', () => {
  it('returns the number of keys in an object', () => {
    expect(count(exampleObject)).toEqual(3)
  })
})

describe('map for objects', () => {
  it('creates a new map with the same keys with each property being mapped', () => {
    const result = map(exampleObject, (value, key, index) => key + value + index)
    expect(result.keyOne).toStrictEqual('keyOneValueOne0')
    expect(result.keyTwo).toStrictEqual('keyTwoValueTwo1')
    expect(result.keyThree).toStrictEqual('keyThreeValueThree2')
  })
})

describe('mapToArray for objects', () => {
  it('maps over the keys and values in an object and returns an array', () => {
    const result = mapToArray(exampleObject, (value, key, index) => key + value + index)
    expect(result).toHaveLength(3)
    expect(result[0]).toStrictEqual('keyOneValueOne0')
    expect(result[1]).toStrictEqual('keyTwoValueTwo1')
    expect(result[2]).toStrictEqual('keyThreeValueThree2')
  })
})

describe('every for objects', () => {
  it('always returns true for empty object', () => {
    const result = every({}, value => typeof value === 'string')
    expect(result).toStrictEqual(true)
  })

  it('returns true if every object matches the predicate', () => {
    const result = every(exampleObject, value => typeof value === 'string')
    expect(result).toStrictEqual(true)
  })

  it('early terminates if a non matching element found', () => {
    const iterated: string[] = []
    const result = every(exampleObject, (value, key) => {
      iterated.push(key)
      return typeof value === 'number'
    })
    expect(result).toStrictEqual(false)
    expect(iterated).toHaveLength(1)
  })
})

describe('mapToObject', () => {
  const input = () => [
    { id: 4, value: 'x' },
    { id: 7, value: 'z' },
    { id: 13, value: 'y' }
  ]

  it('moves id property to object key while mapping', () => {
    const result = mapToObject(input(), 'id', (element) => element.value)
    expect(result).toHaveProperty('4', 'x')
    expect(result).toHaveProperty('7', 'z')
    expect(result).toHaveProperty('13', 'y')
  })

  it('moves value property to object key while mapping', () => {
    const result = mapToObject(input(), 'value', (element) => element.id)
    expect(result).toHaveProperty('x', 4)
    expect(result).toHaveProperty('z', 7)
    expect(result).toHaveProperty('y', 13)
  })
})

describe('arrayToObject', () => {
  const input = () => [
    { id: 4, value: 'x' },
    { id: 7, value: 'z' },
    { id: 13, value: 'y' }
  ]

  it('moves id property to object key', () => {
    const result = arrayToObject(input(), 'id')
    expect(result).toHaveProperty('4', { id: 4, value: 'x' })
    expect(result).toHaveProperty('7', { id: 7, value: 'z' })
    expect(result).toHaveProperty('13', { id: 13, value: 'y' })
  })

  it('moves value property to object key', () => {
    const result = arrayToObject(input(), 'value')
    expect(result).toHaveProperty('x', { id: 4, value: 'x' })
    expect(result).toHaveProperty('z', { id: 7, value: 'z' })
    expect(result).toHaveProperty('y', { id: 13, value: 'y' })
  })
})
