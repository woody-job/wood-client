export type WoodNaming = {
  id: number
  name: string
}

export type WoodNamingWithoutId = Omit<WoodNaming, 'id'>

export type WoodNamingFormType = {
  name: string
}
