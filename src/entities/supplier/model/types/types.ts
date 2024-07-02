export type Supplier = {
  id: number
  name: string
}

export type SupplierWithoutId = Omit<Supplier, 'id'>

export type SupplierFormType = {
  name: string
}
