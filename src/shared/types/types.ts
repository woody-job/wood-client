import { Dayjs } from 'dayjs'

export type ResponseWithToken = {
  token: string
}

export type TimeRange = {
  startDate: Dayjs
  endDate: Dayjs
}
