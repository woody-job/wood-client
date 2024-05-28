export type ShipmentFormType = {
  amount: number
  woodClassId: number
  woodTypeId: number
  dimensionId: number
}

export type ShipmentParams = ShipmentFormType & {
  woodConditionId: number
  date: string
}

export type ShipmentTableData = {
  dimension: string
  woodClass: string
  amount: number
}

export type ShipmentSunburstData = {
  name: string
  children: ShipmentSunburstChild[]
}

export type ShipmentSunburstChild = {
  name: string
  size: number
}

export type ShipmentStatsResponse = {
  tableData?: ShipmentTableData[]
  sunburstData: ShipmentSunburstData[]
  totalVolume: number
}

export type ShipmentFetchParams = {
  startDate: string
  endDate: string
  woodConditionId: number
}

export type ShipmentFetchStatsParams = {
  startDate: string
  endDate: string
  woodConditionId: number
}
