import {
  ArrivalFetchStatsParams,
  ArrivalParams,
  ArrivalStatsResponse,
} from '@/entities/wood-arrival'
import { baseApi } from '@/shared/api'

export const woodArrivalApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchWoodArrival: build.query<ArrivalStatsResponse, ArrivalFetchStatsParams>({
      query: ({ woodConditionId, ...params }) => ({
        url: `wood-arrival/get/stats/${woodConditionId}`,
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

    updateWoodArrival: build.mutation<ArrivalParams, ArrivalParams>({
      query: arrival => ({
        url: 'wood-arrival',
        method: 'PUT',
        body: arrival,
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
  useFetchWoodArrivalQuery,
  useAddWoodArrivalMutation,
  useUpdateWoodArrivalMutation,
  useDeleteWoodArrivalMutation,
} = woodArrivalApi
