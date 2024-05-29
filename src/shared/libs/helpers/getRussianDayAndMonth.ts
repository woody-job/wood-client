import dayjs from 'dayjs'

export const getRussianDayAndMonth = (isoDateString: string) => {
  return dayjs(isoDateString).locale('ru-Ru').format('DD MMM')
}
