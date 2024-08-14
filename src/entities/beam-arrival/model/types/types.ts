import { BeamSize } from '@/entities/beam-in/model'
import { Supplier } from '@/entities/supplier'
import { WoodNaming } from '@/entities/wood-naming'
import { WoodType } from '@/entities/wood-type'

export type BeamArrivalItem = {
  volume: number | null | undefined
  beamSizeId: number | null | undefined
  amount: number | null | undefined
}

export type BeamArrivalFormType = {
  supplierId: number | null | undefined
  deliveryMethod: BEAM_DELIVERY_METHOD | null | undefined
  woodTypeId: number
  length: number | null
  beamArrivalItems: BeamArrivalItem[]
}

export type UpdateBeamArrivalFormType = { amount?: number; volume?: number }

export enum BEAM_DELIVERY_METHOD {
  SUPPLIER_TRANSPORT = 'SUPPLIER_TRANSPORT',
  OWNER_TRANSPORT = 'OWNER_TRANSPORT',
}

export type BeamArrival = {
  id: number
  date: string
  partyNumber: number | null
  amount: number | null
  volume: number | null
  supplier: Supplier | null
  deliveryMethod: BEAM_DELIVERY_METHOD | null
  woodNaming: WoodNaming
  woodType: WoodType
  beamSize: BeamSize | null
}

export type BeamArrivalParams = {
  beamArrivalId: number
}

export type CreateBeamArrivalParams = {
  date: string
  supplierId?: number
  deliveryMethod?: BEAM_DELIVERY_METHOD
  amount?: number
  volume?: number
  beamSizeId?: number
  length: number
  woodTypeId: number
}

export type BeamArrivalByDayResponse = {
  data: BeamArrival[]
  totalVolume: number
}

export type BeamArrivalFetchParams = {
  startDate: string
  endDate: string
  woodConditionId: number
}

export type BeamArrivalFetchByDayParams = {
  date: string
}

export type BeamArrivalByTimeRangeResponse = {
  data: BeamArrival[]
  totalVolume: number
}

export type BeamArrivalFetchTimeRangeParams = {
  startDate: string
  endDate: string
}

export type UpdateBeamArrivalParams = {
  beamArrivalId: number
  amount?: number
  volume?: number
}
