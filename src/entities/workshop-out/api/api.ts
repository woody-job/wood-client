import { baseApi } from '@/shared/api'

import {
  GetWorkshopOutForDateResponse,
  GetWorkshopOutForDateParams,
  CreateWorkshopOutParams,
  UpdateWorkshopOutParams,
  DeleteWorkshopOutParams,
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
  useCreateWorkshopOutMutation,
  useUpdateWorkshopOutMutation,
  useDeleteWorkshopOutMutation,
} = workshopOutApi
