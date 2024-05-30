import { baseApi } from '@/shared/api'

import {
  CreateWorkshopOutParams,
  DeleteWorkshopOutParams,
  GetProfitStatsForWorkshopParams,
  GetProfitStatsForWorkshopResponse,
  GetWorkshopOutForDateParams,
  GetWorkshopOutForDateResponse,
  GetWorkshopOutStatsParams,
  GetWorkshopOutStatsResponse,
  GetWorkshopReportParams,
  GetWorkshopReportResponse,
  UpdateWorkshopOutParams,
  WorkshopCurrentStats,
} from '../model'

export const workshopOutApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchWorkshopOutForDate: build.query<
      GetWorkshopOutForDateResponse,
      GetWorkshopOutForDateParams
    >({
      query: ({ workshopId, date }) => ({
        url: `workshop-out/day-data/${workshopId}`,
        params: { date },
      }),
      providesTags: ['WorkshopOutForDay'],
    }),

    fetchWorkshopOutStatsForWorkshop: build.query<
      GetWorkshopOutStatsResponse,
      GetWorkshopOutStatsParams
    >({
      query: ({ workshopId, startDate, endDate }) => ({
        url: `workshop-out/get/workshop-stats/${workshopId}`,
        params: { startDate, endDate },
      }),
      providesTags: ['WorkshopOutStats'],
    }),

    fetchCurrentWorkshopsStats: build.query<WorkshopCurrentStats, void>({
      query: () => ({
        url: `workshop-out/get/stats`,
      }),
      providesTags: ['WorkshopCurrentStats'],
    }),

    fetchProfitStatsForWorkshop: build.query<
      GetProfitStatsForWorkshopResponse,
      GetProfitStatsForWorkshopParams
    >({
      query: ({ workshopId, startDate, endDate, perUnit }) => ({
        url: `workshop-out/get/workshop-stats/profit/${workshopId}`,
        params: { startDate, endDate, perUnit },
      }),
      providesTags: ['WorkshopProfitStats'],
    }),

    fetchWorkshopReport: build.query<GetWorkshopReportResponse, GetWorkshopReportParams>({
      query: ({ workshopId, startDate, endDate }) => ({
        url: `workshop-out/get/workshop-stats/report/${workshopId}`,
        params: { startDate, endDate },
      }),
      providesTags: ['WorkshopReportStats'],
    }),

    createWorkshopOut: build.mutation<void, CreateWorkshopOutParams>({
      query: createWorkshopOutParams => ({
        url: `workshop-out`,
        method: 'POST',
        body: createWorkshopOutParams,
      }),
      invalidatesTags: ['WorkshopOutForDay', 'WorkshopDailyData'],
    }),

    updateWorkshopOut: build.mutation<void, UpdateWorkshopOutParams>({
      query: ({ workshopOutId, workshopOutData }) => ({
        url: `workshop-out/${workshopOutId}`,
        method: 'PUT',
        body: workshopOutData,
      }),
      invalidatesTags: ['WorkshopOutForDay', 'WorkshopDailyData'],
    }),

    deleteWorkshopOut: build.mutation<void, DeleteWorkshopOutParams>({
      query: ({ workshopOutId }) => ({
        url: `workshop-out/${workshopOutId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WorkshopOutForDay', 'WorkshopDailyData'],
    }),
  }),
})

export const {
  useFetchWorkshopOutForDateQuery,
  useFetchProfitStatsForWorkshopQuery,
  useFetchWorkshopOutStatsForWorkshopQuery,
  useFetchWorkshopReportQuery,
  useCreateWorkshopOutMutation,
  useUpdateWorkshopOutMutation,
  useDeleteWorkshopOutMutation,
  useFetchCurrentWorkshopsStatsQuery,
} = workshopOutApi
