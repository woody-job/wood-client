export type Buyer = {
  id: number
  name: string
}

export type BuyerWithoutId = Omit<Buyer, 'id'>

export type BuyerFormType = {
  name: string
}
