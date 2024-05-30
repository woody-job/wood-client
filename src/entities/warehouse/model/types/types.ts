import { Dimension } from '@/entities/dimension'
import { WoodClass } from '@/entities/wood-class'
import { WoodCondition } from '@/entities/wood-condition'
import { WoodType } from '@/entities/wood-type'

export type WarehouseSunburstItem = {
  name: string
  size: number
}

export type WarehouseSunburstData = {
  name: string
  children: WarehouseSunburstDataChild[]
}

export type WarehouseSunburstDataChild = {
  name: string
  children: WarehouseSunburstItem[]
}

export type Warehouse = {
  sunburstData: WarehouseSunburstData[]
  totalVolume: number
  oldOutput: WarehouseOutput[]
}

export type WarehouseOutput = {
  id: number
  amount: number
  woodClass: WoodClass
  woodType: WoodType
  woodCondition: WoodCondition
  dimension: Dimension
}

export type WarehouseStatsData = {
  woodConditionId: number
  woodConditionName: string
  sorts: Record<string, number>
  totalVolume: number
}

export type WarehouseStats = WarehouseStatsData[]
