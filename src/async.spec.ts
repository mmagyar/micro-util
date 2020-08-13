import { promiseDelay, promiseTimeout } from './async.js'

describe('promiseTimeout', () => {
  it('returns a promise with an undefined value', async () => {
    const result = await promiseTimeout(10)
    expect(result).toBeUndefined()
  })
})

describe('promiseDelay', () => {
  it('returns a promise with a set value in a promise after a delay', async () => {
    jest.useFakeTimers()
    const result = promiseDelay<string>(10)('myValue')
    jest.runAllTimers()
    const valueInPromise = await result
    expect(valueInPromise).toStrictEqual('myValue')
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10, 'myValue')
  })
})
