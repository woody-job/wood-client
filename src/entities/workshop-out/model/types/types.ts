import { Dimension } from '@/entities/dimension'
import { WoodClass } from '@/entities/wood-class'
import { WoodType } from '@/entities/wood-type'

export type GetWorkshopOutForDateParams = {
  workshopId: number
  date: string
}

export type WorkshopOut = {
  id: number
  date: string
  amount: number
  workshopWoodPriceId: number
  woodClass: WoodClass
  woodType: WoodType
  dimension: Dimension
}

export type SunburstItem = {
  name: string
  size?: number
  children?: SunburstItem[]
}

export type SunburstData = SunburstItem[]

export type GetWorkshopOutForDateResponse = {
  data: WorkshopOut[]
  totalWorkshopOutVolume: number
}

export type CreateWorkshopOutParams = {
  date: string
  amount: number
  workshopId: number
  woodClassId: number
  woodTypeId: number
  dimensionId: number
}

export type UpdateWorkshopOutParams = {
  workshopOutId: number
  workshopOutData: {
    amount: number
    woodClassId: number
    woodTypeId: number
    dimensionId: number
  }
}

export type DeleteWorkshopOutParams = {
  workshopOutId: number
}

export type WorkshopOutFormType = {
  dimensionId: number
  woodClassId: number
  woodTypeId: number
  amount: number
}

// TODO: Привести типы к единому виду (то же касается и beam in)
export type WorkshopOutStatWood = {
  name: string
  percentage: number
}

export type WorkshopOutStat = {
  date: string
  woods: WorkshopOutStatWood[]
}

export type WorkshopReportItem = {
  date: string
  woodNaming: null | string
  dimension: null | string
  totalBeamInVolume: number
  totalWorkshopOutPercentage: number
  totalWoodPrice: number
  priceOfRawMaterials: number
  sawingPrice: number
  profit: number
  profitPerUnit: number
  firstClassVolume: number
  firstClassPercentage: null | number
  secondClassVolume: number
  secondClassPercentage: null | number
  marketClassVolume: number
  marketClassPercentage: null | number
  thirdClassVolume: number
  thirdClassPercentage: null | number
}

export type GetWorkshopReportResponse = WorkshopReportItem[]

export type GetWorkshopReportParams = {
  workshopId: number
  startDate?: string
  endDate?: string
}

export type LastWorkingDayStats = {
  date: string
  totalBeamInVolume: number
  profitPerUnit: number
}

export type WorkshopCurrentStat = {
  workshopId: number
  workshopName: string
  woods: WorkshopOutStat[]
  lastWorkingDayStats: LastWorkingDayStats
}

export type WorkshopCurrentStats = WorkshopCurrentStat[]

export type WorkshopProducedSunburstDataItem = {
  name: string
  children: {
    name: string
    size: number
  }[]
}
