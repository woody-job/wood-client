import { BeamWarehouse, BeamWarehouseStats } from '@/entities/beam-warehouse'
import { baseApi } from '@/shared/api'

export const beamWarehouseApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchBeamWarehouse: builder.query<BeamWarehouse, void>({
      query: () => `beam-warehouse`,
      providesTags: ['BeamWarehouse'],
    }),

    fetchBeamWarehouseStats: builder.query<BeamWarehouseStats, void>({
      query: () => `beam-warehouse/get/stats`,
      providesTags: ['BeamWarehouseStats'],
    }),
  }),
})

export const { useFetchBeamWarehouseQuery, useFetchBeamWarehouseStatsQuery } = beamWarehouseApi
