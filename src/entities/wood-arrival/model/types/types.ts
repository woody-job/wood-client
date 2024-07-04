import { Dimension } from '@/entities/dimension'
import { Supplier } from '@/entities/supplier'
import { WoodClass } from '@/entities/wood-class'
import { WoodCondition } from '@/entities/wood-condition'
import { WoodType } from '@/entities/wood-type'

export type ArrivalFormType = {
  amount: number
  woodClassId: number
  woodTypeId: number
  dimensionId: number
  supplierId?: number
  car?: string
}

export type WoodArrival = {
  id: number
  date: string
  amount: number
  car: string
  woodClass: WoodClass
  woodType: WoodType
  woodCondition: WoodCondition
  dimension: Dimension
  supplier: Supplier
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
  car: string
  supplier: string
  volume: number
}

export type ArrivalByDayResponse = {
  tableData?: ArrivalTableData[]
  totalVolume: number
}

export type ArrivalFetchDayParams = {
  date: string
  woodConditionId: number
}

export type ArrivalByTimeRangeResponse = {
  data: WoodArrival[]
  totalVolume: number
}

export type ArrivalFetchTimeRangeParams = {
  startDate: string
  endDate: string
}

export type UpdateArrivalParams = {
  amount: number
  woodClassId: number
  dimensionId: number
  arrivalId: number
}
