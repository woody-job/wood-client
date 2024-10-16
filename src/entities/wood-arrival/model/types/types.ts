import { Dimension } from '@/entities/dimension'
import { Supplier } from '@/entities/supplier'
import { WoodClass } from '@/entities/wood-class'
import { WoodCondition } from '@/entities/wood-condition'
import { WoodType } from '@/entities/wood-type'

export type WoodArrivalItem = {
  amount?: number
  woodClassId?: number
  woodTypeId?: number
  dimensionId?: number
}

export type ArrivalFormType = {
  supplierId?: number
  car?: string
  woodArrivalItems: WoodArrivalItem[]
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

export type ArrivalParams = {
  supplierId?: number
  car?: string
  amount?: number
  woodClassId?: number
  woodTypeId?: number
  dimensionId?: number
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
  totalAmount: number
}

export type ArrivalFetchDayParams = {
  date: string
  woodConditionId: number
}

export type ArrivalByTimeRangeResponse = {
  data: WoodArrival[]
  totalVolume: number
  totalAmount: number
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
