import { SyntheticEvent, useEffect, useMemo, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { TimeRange } from '@/shared/types'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { UseSearchParamsTabsReturn } from './types'

export const useSearchParamsTabs = <TTab>(
  tabName: string,
  tabs: TTab[] | undefined,
  tabKeySelector: (tab: TTab) => string | undefined,
  defaultTab: TTab
): UseSearchParamsTabsReturn<TTab> => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentTab = useMemo(() => {
    const currentTab = searchParams.get(tabName)

    const findTab = tabs?.find(tab => tabKeySelector(tab) === currentTab)
    if (!findTab) return defaultTab

    return findTab
  }, [defaultTab, searchParams, tabKeySelector, tabName, tabs])

  const handleChangeTab = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams({ [tabName]: newValue })
  }

  return {
    currentTab,
    handleChangeTab,
  }
}

export const useDateInSearchParams = () => {
  dayjs.extend(utc)

  // По дефолту открывается предыдущий рабочий день
  const [date, setDate] = useState(() => {
    const now = dayjs()

    const currentWeekday = now.day()

    // 1 - это понедельник (второй по индексу). У dayjs по дефолту первый день недели - это воскресенье
    // Нам нужно его пропустить.
    if (currentWeekday === 1) {
      return now.subtract(2, 'days')
    }

    return now.subtract(1, 'days')
  })

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (!searchParams.get('date')) {
      setSearchParams({ date: date.format('DD.MM.YYYY') })

      return
    }
    // По какой-то причине .utc очень важно, иначе бывает съезд по дате на 1 день.
    const dateFromQueryParam = dayjs.utc(searchParams.get('date'), 'DD.MM.YYYY')

    setDate(dateFromQueryParam)
  }, [])

  const handleSetDate = (value: Dayjs) => {
    setDate(value)
    setSearchParams({ date: value.format('DD.MM.YYYY') })
  }

  return {
    date,
    handleSetDate,
  }
}

export const useTimeRangeInSearchParams = () => {
  dayjs.extend(utc)

  // По дефолту открывается диапазон позавчера/вчера
  // TODO: без обработки выходного (воскресенья)
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startDate: dayjs().subtract(2, 'days'),
    endDate: dayjs().subtract(1, 'days'),
  })

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (!searchParams.get('startDate') || !searchParams.get('endDate')) {
      setSearchParams({
        startDate: timeRange.startDate.format('DD.MM.YYYY'),
        endDate: timeRange.endDate.format('DD.MM.YYYY'),
      })

      return
    }

    const startDateFromQueryParam = dayjs.utc(searchParams.get('startDate'), 'DD.MM.YYYY')
    const endDateFromQueryParam = dayjs.utc(searchParams.get('endDate'), 'DD.MM.YYYY')

    setTimeRange({ startDate: startDateFromQueryParam, endDate: endDateFromQueryParam })
  }, [])

  const handleSetTimeRange = (value: TimeRange) => {
    setTimeRange(value)
    setSearchParams({
      startDate: value.startDate.format('DD.MM.YYYY'),
      endDate: value.endDate.format('DD.MM.YYYY'),
    })
  }

  return {
    timeRange,
    handleSetTimeRange,
  }
}
