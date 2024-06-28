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

// { [woodClass]: [woodType1, woodType2] }
export type WoodParams = Record<string, string[]>

export type WorkshopDefaultDimension = {
  width: number
  thickness: number
  length: number
  woodParams: WoodParams
}

export type DimensionWithWoodType = Dimension & { woodType: WoodType }
