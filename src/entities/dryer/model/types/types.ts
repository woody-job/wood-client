export type Dryer = {
  id: number
  name: string
}

export type DryerDataItem = {
  name: string
  size: number
}

export type DryerDataResponse = {
  data: DryerDataItem[]
  total: number
}

export type DryerDataList = {
  sunburstData: DryerDataListSunburstDataItem[]
  totalVolume: number
}

type DryerDataListSunburstItem = {
  name: string
  children: { name: string; size: number }[]
}

type DryerDataListSunburstDataItem = {
  name: string
  children: DryerDataListSunburstItem[]
}

export type DryerDataParams = {
  woodClassId: number
  dimensionId: number
  woodTypeId: number
  date: string
  amount: number
  dryerChamberId: number
}

export type DryerBringInFormType = Omit<DryerDataParams, 'dryerChamberId' | 'date'>

export type DryerWithoutId = Omit<Dryer, 'id'>

export type DryerFormType = DryerWithoutId
