import { Task, ViewMode } from '../types/public-types'
import DateTimeFormatOptions = Intl.DateTimeFormatOptions
import DateTimeFormat = Intl.DateTimeFormat

type DateHelperScales =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'

const intlDTCache: { [key: string]: DateTimeFormat } = {}
export const getCachedDateTimeFormat = (
  locString: string | string[],
  opts: DateTimeFormatOptions = {},
): DateTimeFormat =>
{
  const key = JSON.stringify([locString, opts])
  let dtf = intlDTCache[key]
  if (!dtf)
  {
    dtf = new Intl.DateTimeFormat(locString, opts)
    intlDTCache[key] = dtf
  }
  return dtf
}

export const addToDate = (
  date: Date,
  quantity: number,
  scale: DateHelperScales,
) =>
{
  const newDate = new Date(
    date.getFullYear() + (scale === 'year' ? quantity : 0),
    date.getMonth() + (scale === 'month' ? quantity : 0),
    date.getDate() + (scale === 'day' ? quantity : 0),
    date.getHours() + (scale === 'hour' ? quantity : 0),
    date.getMinutes() + (scale === 'minute' ? quantity : 0),
    date.getSeconds() + (scale === 'second' ? quantity : 0),
    date.getMilliseconds() + (scale === 'millisecond' ? quantity : 0),
  )
  return newDate
}

export const startOfDate = (date: Date, scale: DateHelperScales) =>
{
  const scores = [
    'millisecond',
    'second',
    'minute',
    'hour',
    'day',
    'month',
    'year',
  ]

  const shouldReset = (_scale: DateHelperScales) =>
  {
    const maxScore = scores.indexOf(scale)
    return scores.indexOf(_scale) <= maxScore
  }
  const newDate = new Date(
    date.getFullYear(),
    shouldReset('year') ? 0 : date.getMonth(),
    shouldReset('month') ? 1 : date.getDate(),
    shouldReset('day') ? 0 : date.getHours(),
    shouldReset('hour') ? 0 : date.getMinutes(),
    shouldReset('minute') ? 0 : date.getSeconds(),
    shouldReset('second') ? 0 : date.getMilliseconds(),
  )
  return newDate
}

export const ganttDateRange = (
  tasks: Task[],
  viewMode: ViewMode,
  preStepsCount: number,
) =>
{
  let newStartDate: Date = tasks[0].start
  let newEndDate: Date = tasks[0].start
  for (const task of tasks)
  {
    if (task.start < newStartDate)
    {
      newStartDate = task.start
    }
    if (task.end > newEndDate)
    {
      newEndDate = task.end
    }
  }
  switch (viewMode)
  {
    case ViewMode.Month:
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, 'month')
      newStartDate = startOfDate(newStartDate, 'month')
      newEndDate = addToDate(newEndDate, 1, 'year')
      newEndDate = startOfDate(newEndDate, 'year')
      break
    case ViewMode.Day:
      newStartDate = startOfDate(newStartDate, 'day')
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, 'day')
      newEndDate = startOfDate(newEndDate, 'day')
      newEndDate = addToDate(newEndDate, 19, 'day')
      break
    case ViewMode.Hour:
      newStartDate = startOfDate(newStartDate, 'hour')
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, 'hour')
      newEndDate = startOfDate(newEndDate, 'day')
      newEndDate = addToDate(newEndDate, 1, 'day')
      break
  }
  return [newStartDate, newEndDate]
}

export const seedDates = (
  startDate: Date,
  endDate: Date,
  viewMode: ViewMode,
) =>
{
  let currentDate: Date = new Date(startDate)
  const dates: Date[] = [currentDate]
  while (currentDate < endDate)
  {
    switch (viewMode)
    {
      case ViewMode.Month:
        currentDate = addToDate(currentDate, 1, 'month')
        break
      case ViewMode.Day:
        currentDate = addToDate(currentDate, 1, 'day')
        break
      case ViewMode.Hour:
        currentDate = addToDate(currentDate, 1, 'hour')
        break
    }
    dates.push(currentDate)
  }
  return dates
}

export const getLocaleMonth = (date: Date, locale: string) =>
{
  let bottomValue = getCachedDateTimeFormat(locale, {
    month: 'long',
  }).format(date)
  bottomValue = bottomValue.replace(
    bottomValue[0],
    bottomValue[0].toLocaleUpperCase(),
  )
  return bottomValue
}

export const getLocalDayOfWeek = (
  date: Date,
  locale: string,
  format?: 'long' | 'short' | 'narrow' | undefined,
) =>
{
  let bottomValue = getCachedDateTimeFormat(locale, {
    weekday: format,
  }).format(date)
  bottomValue = bottomValue.replace(
    bottomValue[0],
    bottomValue[0].toLocaleUpperCase(),
  )
  return bottomValue
}

export const getDaysInMonth = (month: number, year: number) =>
{
  return new Date(year, month + 1, 0).getDate()
}
