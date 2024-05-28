export type ArrivalFormType = {
  amount: number
  woodClassId: number
  woodTypeId: number
  dimensionId: number
}

export type ArrivalParams = ArrivalFormType & {
  woodConditionId: number
  date: string
}

export type ArrivalTableData = {
  dimension: string
  woodClass: string
  amount: number
}

export type ArrivalSunburstData = {
  name: string
  children: ArrivalSunburstChild[]
}

export type ArrivalSunburstChild = {
  name: string
  size: number
}

export type ArrivalStatsResponse = {
  tableData?: ArrivalTableData[]
  sunburstData: ArrivalSunburstData[]
  totalVolume: number
}

export type ArrivalFetchParams = {
  startDate: string
  endDate: string
  woodConditionId: number
}

export type ArrivalFetchStatsParams = {
  startDate: string
  endDate: string
  woodConditionId: number
}
