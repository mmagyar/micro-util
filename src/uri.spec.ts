import { serialize } from './uri'

describe('serialize to query params', () => {
  it('encodes simple object with primitives', () => {
    expect(serialize({ a: 1, b: 'two', c: true, d: false })).toEqual('a=1&b=two&c=true&d=false')
  })

  it('encodes nested objects', () => {
    expect(serialize({ a: 1, b: 'two', c: true, d: false, e: { f: 'g', h: 'i' }, k: [9, 4, 6] }))
      .toEqual('a=1&b=two&c=true&d=false&e%5Bf%5D=g&e%5Bh%5D=i&k%5B0%5D=9&k%5B1%5D=4&k%5B2%5D=6')
  })
})
