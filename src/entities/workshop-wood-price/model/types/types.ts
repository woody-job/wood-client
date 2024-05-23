import { Dimension } from '@/entities/dimension'
import { WoodClass } from '@/entities/wood-class'

export type WorkshopWoodPrice = {
  id: number
  price: number
  dimension: Dimension
  woodClass: WoodClass
}

export type GetWorkshopWoodPricesParams = {
  workshopId: number
}

export type CreateWorkshopWoodPriceParams = {
  price: number
  workshopId: number
  dimensionId: number
  woodClassId: number
}

export type UpdateWorkshopWoodPriceParams = {
  workshopWoodPriceId: number
  price: number
}
