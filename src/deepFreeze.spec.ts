import { deepFreeze } from './deepFreeze.js'
describe('deepFreeze objects', () => {
  it('prevents modification of object input object', () => {
    const frozen = { a: 1, b: 2, c: { d: 4, e: 5, f: { g: 6 } } }
    const result: any = deepFreeze(frozen)
    expect(Object.isFrozen(frozen)).toBeTruthy()
    expect(Object.isFrozen(frozen.c)).toBeTruthy()
    expect(Object.isFrozen(frozen.c.f)).toBeTruthy()
    expect(Object.isFrozen(frozen.c.f.g)).toBeTruthy()
    expect(frozen).toStrictEqual(result)
    expect(frozen === result).toBeTruthy()
  })
})
