import { WoodClass } from '@/entities/wood-class'

export type Dimension = {
  id: number
  width: number
  thickness: number
  length: number
  volume: number
  woodClass: WoodClass
}

export type CreateDimensionParams = {
  width: number
  thickness: number
  length: number
  woodClassId: number
}

export type UpdateDimensionParams = {
  dimensionId: number
  dimensionData: CreateDimensionParams
}

export type DeleteDimensionParams = {
  dimensionId: number
}

export type DimensionFormType = {
  width: number
  thickness: number
  length: number
  woodClass: string
}
