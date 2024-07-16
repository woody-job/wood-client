import { BeamSize } from '@/entities/beam-in/model'
import { WoodNaming } from '@/entities/wood-naming'

export type BeamWarehouse = {
  totalVolume: number
  data: BeamWarehouseOutput[]
}

export type BeamWarehouseOutput = {
  id: number
  woodNaming: WoodNaming
  beamSize: BeamSize
  amount: number | null | undefined
  volume: number | null | undefined
}

export type BeamWarehouseStatsData = {
  woodTypeId: number
  woodTypeName: string
  totalVolume: number
}

export type BeamWarehouseStats = BeamWarehouseStatsData[]
