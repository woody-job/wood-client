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
  id: number
  dimension: string
  woodClass: string
  amount: number
}

export type ArrivalSunburstItem = {
  name: string
  size: number
}

export type ArrivalByDayResponse = {
  tableData?: ArrivalTableData[]
  sunburstData: ArrivalSunburstItem[]
  totalVolume: number
}

export type ArrivalFetchDayParams = {
  date: string
  woodConditionId: number
}

export type UpdateArrivalParams = {
  amount: number
  woodClassId: number
  dimensionId: number
  arrivalId: number
}
