export type IDate = {
  year: number;
  month: number;
  day: number;
}

export type Time = {
  hour: number;
  minute: number;
  second?: number;
  millisecond?: number;
  timezone: 'UTC';
  inputTimezone?: string | number;
}

/**
 * This date time is to be used for transfer as an object
 */
export type DateTime = {
  date: IDate;
  time: Time;
}

export const dateToUTCIDate = (date: Date):
IDate => ({
  year: date.getUTCFullYear(),
  month: date.getUTCMonth() + 1,
  day: date.getUTCDate()
})

export const dateToUTCTime = (date: Date): Time => ({
  hour: date.getUTCHours(),
  minute: date.getUTCMinutes(),
  second: date.getUTCSeconds(),
  millisecond: date.getUTCMilliseconds(),
  timezone: 'UTC',
  inputTimezone: date.getTimezoneOffset()
})
export const dateToUTCDateTime = (date: Date): DateTime => ({
  date: dateToUTCIDate(date),
  time: dateToUTCTime(date)
})
export type DateComparisonResult = 'SMALLER' | 'BIGGER' | 'EQUAL';

export const dateComp = (smaller: IDate, bigger: IDate): DateComparisonResult => {
  if (smaller.year > bigger.year) return 'SMALLER'
  else if (smaller.year < bigger.year) return 'BIGGER'

  if (smaller.month > bigger.month) return 'SMALLER'
  else if (smaller.month < bigger.month) return 'BIGGER'

  if (smaller.day > bigger.day) return 'SMALLER'
  else if (smaller.day < bigger.day) return 'BIGGER'

  return 'EQUAL'
}

export const timeComp = (smaller: Time, bigger: Time): DateComparisonResult => {
  if (smaller.hour > bigger.hour) return 'SMALLER'
  else if (smaller.hour < bigger.hour) return 'BIGGER'

  if (smaller.minute > bigger.minute) return 'SMALLER'
  else if (smaller.minute < bigger.minute) return 'BIGGER'

  if ((smaller.second || 0) > (bigger.second || 0)) return 'SMALLER'
  else if ((smaller.second || 0) < (bigger.second || 0)) return 'BIGGER'

  if ((smaller.millisecond || 0) > (bigger.millisecond || 0)) return 'SMALLER'
  else if ((smaller.millisecond || 0) < (bigger.millisecond || 0)) return 'BIGGER'

  return 'EQUAL'
}

export const dateTimeComp = (smaller: DateTime, bigger: DateTime): DateComparisonResult => {
  const dateResult = dateComp(smaller.date, bigger.date)
  if (dateResult === 'EQUAL') { return timeComp(smaller.time, bigger.time) }
  return dateResult
}

export const toIsoString = (dateTime: DateTime) =>
  dateTime.date.year + '-' +
  dateTime.date.month.toString().padStart(2, '0') + '-' +
  dateTime.date.day.toString().padStart(2, '0') + 'T' +
  dateTime.time.hour.toString().padStart(2, '0') + ':' +
  dateTime.time.minute.toString().padStart(2, '0') + ':' +
  (dateTime.time.second || 0).toString().padStart(2, '0') + '.' +
  (dateTime.time.millisecond || 0).toString().padStart(4, '0') +
  'Z'

export const now = (): DateTime => dateToUTCDateTime(new Date())
