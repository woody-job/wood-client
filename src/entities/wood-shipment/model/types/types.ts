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
  id: number
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

export type ShipmentByDayResponse = {
  tableData: ShipmentTableData[]
  sunburstData: ShipmentSunburstChild[]
  totalVolume: number
}

export type ShipmentByRangeResponse = {
  sunburstData: ShipmentSunburstData[]
  totalVolume: number
}

export type ShipmentFetchParams = {
  startDate: string
  endDate: string
  woodConditionId: number
}

export type ShipmentFetchByRangeParams = {
  startDate: string
  endDate: string
  woodConditionId: number
}

export type ShipmentFetchByDayParams = {
  date: string
  woodConditionId: number
}

export type UpdateShipmentParams = {
  amount: number
  woodClassId: number
  dimensionId: number
  shipmentId: number
}
