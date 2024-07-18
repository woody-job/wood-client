export type Workshop = {
  id: number
  name: string
  priceOfRawMaterials: number
  sawingPrice: number
}

export type UpdateWorkshopParams = {
  workshopId: number
  workshopData: {
    name: string
    priceOfRawMaterials: number
    sawingPrice: number
  }
}

export type GetWorkshopDailyStatsParams = {
  workshopId: number
  date: string
}

export type WorkshopDailyStats = {
  totalWoodPrice: number
  priceOfRawMaterials: number
  sawingPrice: number
  profit: number
  profitPerUnit: number
  dimensionOfTheDay: string | null
  dimensionId: number | null
  woodNamingOfTheDay: string | null
  woodNamingId: number
}

export type UpdateWorkshopDailyDimensionParams = {
  workshopId: number
  dimensionId: number
  date: string
}

export type UpdateWorkshopDailyWoodNamingParams = {
  workshopId: number
  woodNamingId: number
  date: string
}
