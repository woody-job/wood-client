import {
  ArrivalByDayResponse,
  ArrivalFetchDayParams,
  ArrivalParams,
  UpdateArrivalParams,
} from '@/entities/wood-arrival'
import { baseApi } from '@/shared/api'

export const woodArrivalApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchWoodArrivalByDay: build.query<ArrivalByDayResponse, ArrivalFetchDayParams>({
      query: ({ woodConditionId, ...params }) => ({
        url: `wood-arrival/get/day-data-stats/${woodConditionId}`,
        params: params,
      }),
      providesTags: ['Arrival'],
    }),

    addWoodArrival: build.mutation<ArrivalParams, ArrivalParams>({
      query: arrival => ({
        url: 'wood-arrival',
        method: 'POST',
        body: arrival,
      }),
      invalidatesTags: ['Arrival'],
    }),

    updateWoodArrival: build.mutation<ArrivalParams, UpdateArrivalParams>({
      query: ({ arrivalId, ...params }) => ({
        url: `wood-arrival/${arrivalId}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['Arrival'],
    }),

    deleteWoodArrival: build.mutation<ArrivalParams, number>({
      query: arrivalId => ({
        url: `wood-arrival/${arrivalId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Arrival'],
    }),
  }),
})

export const {
  useFetchWoodArrivalByDayQuery,
  useAddWoodArrivalMutation,
  useUpdateWoodArrivalMutation,
  useDeleteWoodArrivalMutation,
} = woodArrivalApi
