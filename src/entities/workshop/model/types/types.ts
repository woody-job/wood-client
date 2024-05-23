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
