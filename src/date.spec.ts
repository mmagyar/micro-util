import { dateToUTCDateTime, dateTimeComp, now, dateToUTCTime, toIsoString } from './date'

describe('date', () => {
  it('compares years', () => {
    const dt1 = dateToUTCDateTime(new Date('2020-01-01T08:08:08Z'))
    const dt2 = dateToUTCDateTime(new Date('2021-01-01T08:08:08Z'))
    expect(dateTimeComp(dt1, dt2)).toEqual('BIGGER')
    expect(dateTimeComp(dt2, dt1)).toEqual('SMALLER')
    expect(dateTimeComp(dt1, dt1)).toEqual('EQUAL')
  })

  it('compares months', () => {
    const dt1 = dateToUTCDateTime(new Date('2020-01-01T08:08:00Z'))
    const dt2 = dateToUTCDateTime(new Date('2020-02-01T08:08:00Z'))
    expect(dateTimeComp(dt1, dt2)).toEqual('BIGGER')
    expect(dateTimeComp(dt2, dt1)).toEqual('SMALLER')
    expect(dateTimeComp(dt1, dt1)).toEqual('EQUAL')
  })

  it('compares days', () => {
    const dt1 = dateToUTCDateTime(new Date('2020-01-01T08:08:00Z'))
    const dt2 = dateToUTCDateTime(new Date('2020-01-21T08:08:00Z'))
    expect(dateTimeComp(dt1, dt2)).toEqual('BIGGER')
    expect(dateTimeComp(dt2, dt1)).toEqual('SMALLER')
    expect(dateTimeComp(dt1, dt1)).toEqual('EQUAL')
  })

  it('compares hours', () => {
    const dt1 = dateToUTCDateTime(new Date('2020-01-01T08:08:00Z'))
    const dt2 = dateToUTCDateTime(new Date('2020-01-01T09:08:00Z'))
    expect(dateTimeComp(dt1, dt2)).toEqual('BIGGER')
    expect(dateTimeComp(dt2, dt1)).toEqual('SMALLER')
    expect(dateTimeComp(dt1, dt1)).toEqual('EQUAL')
  })

  it('compares minutes', () => {
    const dt1 = dateToUTCDateTime(new Date('2020-01-01T08:08:00Z'))
    const dt2 = dateToUTCDateTime(new Date('2020-01-01T08:09:00Z'))
    expect(dateTimeComp(dt1, dt2)).toEqual('BIGGER')
    expect(dateTimeComp(dt2, dt1)).toEqual('SMALLER')
    expect(dateTimeComp(dt1, dt1)).toEqual('EQUAL')
  })

  it('compares seconds', () => {
    const dt1 = dateToUTCDateTime(new Date('2020-01-01T08:08:00Z'))
    const dt2 = dateToUTCDateTime(new Date('2020-01-01T08:08:01Z'))
    expect(dateTimeComp(dt1, dt2)).toEqual('BIGGER')
    expect(dateTimeComp(dt2, dt1)).toEqual('SMALLER')
    expect(dateTimeComp(dt1, dt1)).toEqual('EQUAL')
  })

  it('compares milliseconds', () => {
    const dt1 = dateToUTCDateTime(new Date('2020-01-01T08:08:00Z'))
    const dt2 = dateToUTCDateTime(new Date('2020-01-01T08:08:00.001Z'))
    expect(dateTimeComp(dt1, dt2)).toEqual('BIGGER')
    expect(dateTimeComp(dt2, dt1)).toEqual('SMALLER')
    expect(dateTimeComp(dt1, dt1)).toEqual('EQUAL')
  })

  it('transforms js Date to object', () => {
    const date = new Date('2020-01-01T08:08:08Z')
    const result = dateToUTCDateTime(date)
    expect(result.date).toStrictEqual({ year: 2020, month: 1, day: 1 })
    expect(result.time).toStrictEqual({
      hour: 8,
      minute: 8,
      second: 8,
      millisecond: 0,
      timezone: 'UTC',
      inputTimezone: -60
    })
  })

  it('returns now', () => {
    const result = now()
    expect(result).toHaveProperty('date')
    expect(result).toHaveProperty('time')
  })

  it('converts date to time object', () => {
    const date = new Date('2020-01-01T06:07:08.009Z')
    const result = dateToUTCTime(date)
    expect(result).toHaveProperty('hour', 6)
    expect(result).toHaveProperty('minute', 7)
    expect(result).toHaveProperty('second', 8)
    expect(result).toHaveProperty('millisecond', 9)
  })

  it('converts to isoString', () => {
    const result = toIsoString({
      date: { day: 26, month: 10, year: 1985 },
      time: {
        hour: 1,
        minute: 21,
        second: 0,
        timezone: 'UTC'
      }
    })
    const asDate = new Date(result)

    expect(result).toEqual('1985-10-26T01:21:00.0000Z')
    expect(asDate.getTime()).toEqual(499137660000)
  })
})
