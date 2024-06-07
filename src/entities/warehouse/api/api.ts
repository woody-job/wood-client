import { Warehouse, WarehouseStats } from '@/entities/warehouse'
import { baseApi } from '@/shared/api'

export const warehouseApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchWarehouse: builder.query<Warehouse, number>({
      query: woodConditionId => `warehouse/${woodConditionId}`,
      providesTags: ['Warehouse'],
    }),

    fetchWarehouseStats: builder.query<WarehouseStats, void>({
      query: () => `warehouse/get/stats`,
      providesTags: ['WarehouseStats'],
    }),
  }),
})

export const { useFetchWarehouseQuery, useFetchWarehouseStatsQuery } = warehouseApi
