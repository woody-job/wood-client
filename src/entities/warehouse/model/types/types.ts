import { Dimension } from '@/entities/dimension'
import { WoodType } from '@/entities/wood-type'

export type Warehouse = {
  totalVolume: number
  data: WarehouseOutput[]
}

export type WarehouseOutput = {
  id: number
  amount: number
  woodType: WoodType
  dimension: Dimension
  firstClassVolume: number
  firstClassAmount: number
  secondClassVolume: number
  secondClassAmount: number
  marketClassVolume: number
  marketClassAmount: number
  thirdClassVolume: number
  thirdClassAmount: number
  totalVolume: number
}

export type WarehouseStatsData = {
  woodConditionId: number
  woodConditionName: string
  sorts: Record<string, number>
  totalVolume: number
}

export type WarehouseStats = WarehouseStatsData[]
