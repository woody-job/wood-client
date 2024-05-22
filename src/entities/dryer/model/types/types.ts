export type Dryer = {
  id: number
  name: string
}

export type DryerWithoutId = Omit<Dryer, 'id'>

export type DryerFormType = DryerWithoutId