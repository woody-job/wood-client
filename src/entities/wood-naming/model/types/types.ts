import { WoodType } from '@/entities/wood-type'

export type WoodNaming = {
  id: number
  name: string
  minDiameter: number | null
  maxDiameter: number | null
  length: number
  woodType: WoodType
}

export type CreateWoodNamingParams = {
  name: string
  minDiameter?: number
  maxDiameter?: number
  length: number
  woodTypeId: number
}

export type UpdateWoodNamingParams = {
  id: number
  name: string
  minDiameter?: number
  maxDiameter?: number
  length: number
  woodTypeId: number
}

export type WoodNamingFormType = {
  name: string
  minDiameter?: number
  maxDiameter?: number
  length: number
  woodTypeId: number
}
