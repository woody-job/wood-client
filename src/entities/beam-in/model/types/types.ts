export type BeamSize = {
  id: number
  diameter: number
  volume: number
}

export type BeamIn = {
  id: number
  amount: number
  date: string
  beamSize: BeamSize
}

export type GetBeamInForWorkshopParams = {
  workshopId: number
  startDate?: string
  endDate?: string
}

export type GetBeamInResponse = {
  data: BeamIn[]
  totalVolume: number
}

export type CreateBeamInForWorkshopParams = {
  workshopId: number
  beamSizeId: number
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
  diameter: number
  amount: number
}

export type GetBeamInWorkshopStatsResponse = {
  x: string
  y: number
}[]

export type GetBeamInWorkshopStatsParams = {
  workshopId: number
  startDate?: string
  endDate?: string
}
