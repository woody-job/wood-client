import {
  ArrivalByDayResponse,
  ArrivalByTimeRangeResponse,
  ArrivalFetchDayParams,
  ArrivalFetchTimeRangeParams,
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

    fetchWoodArrivalByTimeRange: build.query<
      ArrivalByTimeRangeResponse,
      ArrivalFetchTimeRangeParams
    >({
      query: ({ startDate, endDate }) => ({
        url: `wood-arrival/get/time-range-stats`,
        params: {
          startDate,
          endDate,
        },
      }),
      providesTags: ['ArrivalTimeRange'],
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
  useFetchWoodArrivalByTimeRangeQuery,
  useAddWoodArrivalMutation,
  useUpdateWoodArrivalMutation,
  useDeleteWoodArrivalMutation,
} = woodArrivalApi
