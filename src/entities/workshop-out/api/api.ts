import { baseApi } from '@/shared/api'

import {
  CreateWorkshopOutParams,
  DeleteWorkshopOutParams,
  GetWorkshopOutForDateParams,
  GetWorkshopOutForDateResponse,
  GetWorkshopProducedParams,
  GetWorkshopProducedResponse,
  GetWorkshopReportParams,
  GetWorkshopReportResponse,
  UpdateWorkshopOutParams,
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

    fetchWorkshopReport: build.query<GetWorkshopReportResponse, GetWorkshopReportParams>({
      query: ({ workshopId, startDate, endDate }) => ({
        url: `workshop-out/get/workshop-stats/report/${workshopId}`,
        params: { startDate, endDate },
      }),
      providesTags: ['WorkshopReportStats'],
    }),

    fetchWorkshopProducedStats: build.query<GetWorkshopProducedResponse, GetWorkshopProducedParams>(
      {
        query: () => ({
          url: `workshop-out/get/produced-stats`,
        }),
        providesTags: ['WorkshopProducedStats'],
      }
    ),

    createWorkshopOut: build.mutation<void, CreateWorkshopOutParams>({
      query: createWorkshopOutParams => ({
        url: `workshop-out`,
        method: 'POST',
        body: createWorkshopOutParams,
      }),
      invalidatesTags: ['WorkshopOutForDay', 'WorkshopDailyData', 'WorkshopProducedStats'],
    }),

    updateWorkshopOut: build.mutation<void, UpdateWorkshopOutParams>({
      query: ({ workshopOutId, workshopOutData }) => ({
        url: `workshop-out/${workshopOutId}`,
        method: 'PUT',
        body: workshopOutData,
      }),
      invalidatesTags: ['WorkshopOutForDay', 'WorkshopDailyData', 'WorkshopProducedStats'],
    }),

    deleteWorkshopOut: build.mutation<void, DeleteWorkshopOutParams>({
      query: ({ workshopOutId }) => ({
        url: `workshop-out/${workshopOutId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WorkshopOutForDay', 'WorkshopDailyData', 'WorkshopProducedStats'],
    }),
  }),
})

export const {
  useFetchWorkshopOutForDateQuery,
  useFetchWorkshopReportQuery,
  useFetchWorkshopProducedStatsQuery,
  useCreateWorkshopOutMutation,
  useUpdateWorkshopOutMutation,
  useDeleteWorkshopOutMutation,
} = workshopOutApi
