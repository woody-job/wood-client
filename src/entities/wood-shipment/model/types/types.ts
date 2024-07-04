import { Buyer } from '@/entities/buyer'
import { Dimension } from '@/entities/dimension'
import { PersonInCharge } from '@/entities/personInCharge'
import { WoodClass } from '@/entities/wood-class'
import { WoodCondition } from '@/entities/wood-condition'
import { WoodType } from '@/entities/wood-type'

export type ShipmentFormType = {
  amount: number
  woodClassId: number
  woodTypeId: number
  dimensionId: number
  buyerId?: number
  personInChargeId?: number
  car?: string
}

export type WoodShipment = {
  id: number
  date: string
  amount: number
  car: string
  woodClass: WoodClass
  woodType: WoodType
  woodCondition: WoodCondition
  dimension: Dimension
  buyer: Buyer
  personInCharge: PersonInCharge
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
  car: string
  buyer: string
  personInCharge: string
  volume: number
}

export type ShipmentByDayResponse = {
  tableData: ShipmentTableData[]
  totalVolume: number
}

export type ShipmentFetchParams = {
  startDate: string
  endDate: string
  woodConditionId: number
}

export type ShipmentFetchByDayParams = {
  date: string
  woodConditionId: number
}

export type ShipmentByTimeRangeResponse = {
  data: WoodShipment[]
  totalVolume: number
}

export type ShipmentFetchTimeRangeParams = {
  startDate: string
  endDate: string
}

export type UpdateShipmentParams = {
  amount: number
  woodClassId: number
  dimensionId: number
  shipmentId: number
}
