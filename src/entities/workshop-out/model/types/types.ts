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
  sunburstData: SunburstData
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
