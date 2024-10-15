import { Dimension } from '@/entities/dimension'
import { WoodClass } from '@/entities/wood-class'
import { WoodType } from '@/entities/wood-type'

export type Dryer = {
  id: number
  name: string
}

export type DryerActionsProps = { dryerData: DryerDataItem[] | undefined }

export type DryerDataItem = {
  amount: number
  date: string
  dimension: Dimension
  id: number
  woodClass: WoodClass
  woodType: WoodType
  chamberIterationCountWhenBringingIn: number
}

export type DryerDataResponse = {
  data: DryerDataItem[]
  totalVolume: number
}

export type DryerFormType = {
  name: string
}

export type CreateDryerParams = {
  name: string
}

export type UpdateDryerParams = {
  id: number
  name: string
}

export type DryerDataParams = {
  woodClassId: number
  dimensionId: number
  woodTypeId: number
  date: string
  amount: number
  dryerChamberId: number
}

export type DryerBringInFormType = {
  chamberIterationCount: number | undefined
  woods: {
    woodClassId: number | undefined
    dimensionId: number | undefined
    woodTypeId: number | undefined
    amount: number
  }[]
}

export type DryerRemoveFormType = {
  woods: {
    woodClassId: number | undefined
    amount: number | undefined
    dryerChamberDataRecordId: number | undefined
  }[]
}

export type BringWoodInDryerParams = {
  dryerChamberId: number
  woods: Omit<DryerDataParams, 'dryerChamberId'>[]
}

export type DryerStatsData = {
  dryerId: number
  dryerName: string
  sorts: Record<string, number>
  totalVolume: number
}

export type DryerStats = DryerStatsData[]

export type GetDryerInfoParams = {
  startDate: string
  endDate: string
}

export type DryerInfo = {
  id: number
  date: string
  amount: number
  isDrying: boolean
  isTakenOut: boolean
  dryerChamber: Dryer
  woodType: WoodType
  dimension: Dimension
  woodClass: WoodClass
  chamberIterationCountWhenBringingIn: number
}

export type DryerInfoData = {
  data: DryerInfo[]
  totalVolume: number
}

export type RemoveWoodFromChamberType = {
  woodClassId: number
  amount: number
  dryerChamberDataRecordId: number
}

export type RemoveWoodFromChamberParams = {
  dryerChamberId: number
  changedWoods: RemoveWoodFromChamberType[]
}
