export type PersonInCharge = {
  id: number
  initials: string
  secondName: string
}

export type PersonInChargeWithoutId = Omit<PersonInCharge, 'id'>

export type PersonInChargeFormType = {
  initials: string
  secondName: string
}
