import { Warehouse } from '@/entities/warehouse'
import { baseApi } from '@/shared/api'

export const warehouseApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchWarehouse: builder.query<Warehouse, number>({
      query: woodConditionId => `warehouse/${woodConditionId}`,
    }),
  }),
})

export const { useFetchWarehouseQuery } = warehouseApi
