import { WoodNaming } from '@/entities/wood-naming'

export type BeamSize = {
  id: number
  diameter: number
  volume: number
  length: number
}

export type BeamIn = {
  id: number
  amount: number
  date: string
  beamSize: BeamSize
  woodNaming: WoodNaming
}

export type GetBeamInForWorkshopParams = {
  workshopId: number
  startDate?: string
  endDate?: string
}

export type GetBeamInResponse = {
  data: BeamIn[]
  totalVolume: number
  totalAmount: number
}

export type CreateBeamInForWorkshopParams = {
  workshopId: number
  beamSizeId: number
  woodNamingId: number
  amount: number
  date: string
}

export type UpdateBeamInForWorkshopParams = {
  beamInId: number
  beamInData: {
    beamSizeId: number
    amount: number
  }
}

export type DeleteBeamInForWorkshopParams = {
  beamInId: number
}

export type BeamInFormType = {
  beamSizeId?: number
  woodNamingId?: number
  amount: number
}
