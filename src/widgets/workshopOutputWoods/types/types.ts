import { Dimension } from '@/entities/dimension'
import { WoodType } from '@/entities/wood-type'

export type WorkshopOutTableRow = {
  id: number
  woodClass: string
  woodClassId: number
  dimension: string
  dimensionId: number
  woodType: string
  woodTypeId: number
  amount: number | undefined
  isEmptyDefault: boolean
  workshopOutId: number | undefined
}

export type WorkshopDefaultDimension = {
  width: number
  thickness: number
  length: number
  woodClassesNames: string[]
}

export type DimensionWithWoodType = Dimension & { woodType: WoodType }
