import React, { ReactNode } from 'react'
import { getCachedDateTimeFormat, getDaysInMonth, getLocalDayOfWeek, getLocaleMonth } from '../../helpers/date-helper'
import { DateSetup } from '../../types/date-setup'
import { ViewMode } from '../../types/public-types'
import styles from './calendar.module.css'
import { TopPartOfCalendar } from './top-part-of-calendar'

export type CalendarProps = {
  dateSetup: DateSetup
  locale: string
  headerHeight: number
  columnWidth: number
  fontFamily: string
  fontSize: string
}

export const Calendar: React.FC<CalendarProps> = ({
  dateSetup,
  locale,
  headerHeight,
  columnWidth,
  fontFamily,
  fontSize,
}) =>
{
  const getCalendarValuesForMonth = () =>
  {
    const topValues: ReactNode[] = []
    const bottomValues: ReactNode[] = []
    const topDefaultHeight = headerHeight * 0.5
    for (let i = 0; i < dateSetup.dates.length; i++)
    {
      const date = dateSetup.dates[i]
      const bottomValue = getLocaleMonth(date, locale)
      bottomValues.push(
        <text
          key={bottomValue + date.getFullYear()}
          y={headerHeight * 0.8}
          x={columnWidth * i + columnWidth * 0.5}
          className={styles.calendarBottomText}
        >
          {bottomValue}
        </text>,
      )
      if (
        i === 0
        || date.getFullYear() !== dateSetup.dates[i - 1].getFullYear()
      )
      {
        const topValue = date.getFullYear().toString()
        let xText: number

        xText = (6 + i - date.getMonth()) * columnWidth
        topValues.push(
          <TopPartOfCalendar
            key={topValue}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={xText}
            yText={topDefaultHeight * 0.9}
          />,
        )
      }
    }
    return [topValues, bottomValues]
  }

  const getCalendarValuesForDay = () =>
  {
    const topValues: ReactNode[] = []
    const bottomValues: ReactNode[] = []
    const topDefaultHeight = headerHeight * 0.5
    const dates = dateSetup.dates
    for (let i = 0; i < dates.length; i++)
    {
      const date = dates[i]
      const bottomValue = `${getLocalDayOfWeek(date, locale, 'short')}, ${date.getDate().toString()}`

      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * i + columnWidth * 0.5}
          className={styles.calendarBottomText}
        >
          {bottomValue}
        </text>,
      )
      if (
        i + 1 !== dates.length
        && date.getMonth() !== dates[i + 1].getMonth()
      )
      {
        const topValue = getLocaleMonth(date, locale)

        topValues.push(
          <TopPartOfCalendar
            key={topValue + date.getFullYear()}
            value={topValue}
            x1Line={columnWidth * (i + 1)}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={columnWidth * (i + 1)
              - getDaysInMonth(date.getMonth(), date.getFullYear())
                * columnWidth
                * 0.5}
            yText={topDefaultHeight * 0.9}
          />,
        )
      }
    }
    return [topValues, bottomValues]
  }

  const getCalendarValuesForHour = () =>
  {
    const topValues: ReactNode[] = []
    const bottomValues: ReactNode[] = []
    const topDefaultHeight = headerHeight * 0.5
    const dates = dateSetup.dates
    for (let i = 0; i < dates.length; i++)
    {
      const date = dates[i]
      const bottomValue = getCachedDateTimeFormat(locale, {
        hour: 'numeric',
      }).format(date)

      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * i}
          className={styles.calendarBottomText}
          fontFamily={fontFamily}
        >
          {bottomValue}
        </text>,
      )
      if (i !== 0 && date.getDate() !== dates[i - 1].getDate())
      {
        const displayDate = dates[i - 1]
        const topValue = `${
          getLocalDayOfWeek(
            displayDate,
            locale,
            'long',
          )
        }, ${displayDate.getDate()} ${getLocaleMonth(displayDate, locale)}`
        const topPosition = (date.getHours() - 24) / 2
        topValues.push(
          <TopPartOfCalendar
            key={topValue + displayDate.getFullYear()}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={columnWidth * (i + topPosition)}
            yText={topDefaultHeight * 0.9}
          />,
        )
      }
    }

    return [topValues, bottomValues]
  }

  let topValues: ReactNode[] = []
  let bottomValues: ReactNode[] = []
  switch (dateSetup.viewMode)
  {
    case ViewMode.Month:
      ;[topValues, bottomValues] = getCalendarValuesForMonth()
      break
    case ViewMode.Day:
      ;[topValues, bottomValues] = getCalendarValuesForDay()
      break
    case ViewMode.Hour:
      ;[topValues, bottomValues] = getCalendarValuesForHour()
  }
  return (
    <g className='calendar' fontSize={fontSize} fontFamily={fontFamily}>
      <rect
        x={0}
        y={0}
        width={columnWidth * dateSetup.dates.length}
        height={headerHeight}
        className={styles.calendarHeader}
      />
      {bottomValues} {topValues}
    </g>
  )
}
