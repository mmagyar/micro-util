export const promiseTimeout = <T>(time: number): Promise<T> =>
  new Promise<T>(resolve => setTimeout(resolve, time))

export const promiseDelay = <T>(time: number): (result: T) => Promise<T> => (result: T) =>
  new Promise<T>(resolve => setTimeout(resolve, time, result))
