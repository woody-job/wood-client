import { baseApi } from '@/shared/api'

import {
  GetWorkshopDailyStatsParams,
  UpdateWorkshopDailyDimensionParams,
  UpdateWorkshopDailyWoodNamingParams,
  UpdateWorkshopParams,
  Workshop,
  WorkshopDailyStats,
} from '../model'

export const workshopApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllWorkshops: build.query<Workshop[], void>({
      query: () => ({
        url: 'workshop/list',
      }),
      providesTags: ['AllWorkshops'],
    }),

    updateWorkshop: build.mutation<void, UpdateWorkshopParams>({
      query: ({ workshopId, workshopData }) => ({
        url: `workshop/${workshopId}`,
        method: 'PUT',
        body: workshopData,
      }),
      invalidatesTags: ['AllWorkshops'],
    }),

    fetchWorkshopDailyStats: build.query<WorkshopDailyStats, GetWorkshopDailyStatsParams>({
      query: ({ workshopId, date }) => ({
        url: `workshop-daily-data/get/daily-stats/${workshopId}`,
        params: { date },
      }),
      providesTags: ['WorkshopDailyData'],
    }),

    updateWorkshopDailyDimension: build.mutation<void, UpdateWorkshopDailyDimensionParams>({
      query: workshopDailyDimensionParams => ({
        url: `workshop-daily-data/dimension`,
        method: 'POST',
        body: workshopDailyDimensionParams,
      }),
      invalidatesTags: ['WorkshopDailyData'],
    }),

    updateWorkshopDailyWoodNaming: build.mutation<void, UpdateWorkshopDailyWoodNamingParams>({
      query: workshopDailyWoodNamingParams => ({
        url: `workshop-daily-data/wood-naming`,
        method: 'POST',
        body: workshopDailyWoodNamingParams,
      }),
      invalidatesTags: ['WorkshopDailyData'],
    }),
  }),
})

export const {
  useFetchAllWorkshopsQuery,
  useUpdateWorkshopMutation,
  useFetchWorkshopDailyStatsQuery,
  useUpdateWorkshopDailyDimensionMutation,
  useUpdateWorkshopDailyWoodNamingMutation,
} = workshopApi
