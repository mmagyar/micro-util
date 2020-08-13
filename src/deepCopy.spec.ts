import { deepCopy } from './deepCopy.js'
describe('deepCopy objects', () => {
  it('created deep copy of input object', () => {
    const og = { a: 1, b: 2, c: { d: 4, e: 5, f: { g: 6 } } }
    const result = deepCopy(og)
    expect(og).toStrictEqual(result)
    // It's a copy so reference equality should be false
    expect(og === result).toBeFalsy()

    expect(og.c.f.g).toEqual(result.c.f.g)
    og.c.f.g = 8
    expect(og.c.f.g).not.toEqual(result.c.f.g)
  })

  it('handles a number of data types', () => {
    const og = {
      types: {
        string: 'string',
        number: 123,
        bool: false,
        nul: null,
        array: [1, 2, { c: 5 }],
        date: new Date(), // stringified
        undef: undefined, // lost
        inf: Infinity, // forced to 'null',
        regex: /abc/u
      }
    }

    // og.__proto__.shouldNotCopy = 4;
    const result = deepCopy(og)
    expect(og).toStrictEqual(result)
  })

  it('throws on one special occasion', () => {
    const exception = { empty: Object.create(null) }
    expect(() => deepCopy(exception)).toThrowError()
  })

  it('does not copy prototype', () => {
    const PrototypeTest: any = function prototypeTest (this: any, b: string) {
      // eslint-disable-next-line no-invalid-this
      const me: any = this
      me.b = b
    }
    PrototypeTest.prototype.z = 3
    const og = new PrototypeTest('abc')

    const result = deepCopy(og)
    expect(og.z).toEqual(3)
    expect(result.z).toBeUndefined()
    expect(og.b).toStrictEqual(result.b)
  })
})
