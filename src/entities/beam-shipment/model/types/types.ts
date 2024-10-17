import { BeamSize } from '@/entities/beam-in/model'
import { Buyer } from '@/entities/buyer'
import { WoodNaming } from '@/entities/wood-naming'
import { WoodType } from '@/entities/wood-type'

export type BeamShipmentItem = {
  volume: number | null | undefined
  beamSizeId: number | null | undefined
  amount: number | null | undefined
}

export type BeamShipmentFormType = {
  buyerId: number | null | undefined
  woodTypeId: number
  length: number | null
  beamShipmentItems: BeamShipmentItem[]
}

export type UpdateBeamShipmentFormType = { amount?: number; volume?: number }

export type BeamShipment = {
  id: number
  date: string
  amount: number | null
  volume: number | null
  buyer: Buyer | null
  woodNaming: WoodNaming
  woodType: WoodType
  beamSize: BeamSize | null
}

export type BeamShipmentParams = {
  beamShipmentId: number
}

export type CreateBeamShipmentParams = {
  date: string
  buyerId?: number
  amount?: number
  volume?: number
  beamSizeId?: number
  length: number
  woodTypeId: number
}

export type BeamShipmentByDayResponse = {
  data: BeamShipment[]
  totalVolume: number
  totalAmount: number
}

export type BeamShipmentFetchParams = {
  startDate: string
  endDate: string
  woodConditionId: number
}

export type BeamShipmentFetchByDayParams = {
  date: string
}

export type BeamShipmentByTimeRangeResponse = {
  data: BeamShipment[]
  totalVolume: number
  totalAmount: number
}

export type BeamShipmentFetchTimeRangeParams = {
  startDate: string
  endDate: string
}

export type UpdateBeamShipmentParams = {
  beamShipmentId: number
  amount?: number
  volume?: number
}
