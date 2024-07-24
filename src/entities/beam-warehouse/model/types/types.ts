import { WoodNaming } from '@/entities/wood-naming'

export type BeamWarehouse = {
  totalVolume: number
  data: BeamWarehouseOutput[]
}

export type BeamWarehouseOutput = {
  id: number
  woodNaming: WoodNaming
  volume: number | null | undefined
}

export type BeamWarehouseStatsData = {
  woodTypeId: number
  woodTypeName: string
  totalVolume: number
}

export type BeamWarehouseStats = BeamWarehouseStatsData[]
