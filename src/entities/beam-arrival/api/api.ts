import {
  BeamArrivalByDayResponse,
  BeamArrivalByTimeRangeResponse,
  BeamArrivalFetchByDayParams,
  BeamArrivalFetchTimeRangeParams,
  BeamArrivalParams,
  CreateBeamArrivalParams,
  UpdateBeamArrivalParams,
} from '@/entities/beam-arrival'
import { baseApi } from '@/shared/api'

export const beamArrivalApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchBeamArrivalByDay: build.query<BeamArrivalByDayResponse, BeamArrivalFetchByDayParams>({
      query: ({ date }) => ({
        url: `beam-arrival/get/day-data-stats`,
        params: {
          date,
        },
      }),
      providesTags: ['BeamArrival'],
    }),

    fetchBeamArrivalByTimeRange: build.query<
      BeamArrivalByTimeRangeResponse,
      BeamArrivalFetchTimeRangeParams
    >({
      query: ({ startDate, endDate }) => ({
        url: `beam-arrival/get/time-range-stats`,
        params: {
          startDate,
          endDate,
        },
      }),
      providesTags: ['BeamArrivalTimeRange'],
    }),

    addBeamArrival: build.mutation<string[], CreateBeamArrivalParams[]>({
      query: params => ({
        url: 'beam-arrival',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['BeamArrival', 'BeamArrivalTimeRange'],
    }),

    updateBeamArrival: build.mutation<void, UpdateBeamArrivalParams>({
      query: ({ beamArrivalId, ...params }) => ({
        url: `beam-arrival/${beamArrivalId}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['BeamArrival', 'BeamArrivalTimeRange'],
    }),

    deleteBeamArrival: build.mutation<BeamArrivalParams, number>({
      query: beamArrivalId => ({
        url: `beam-arrival/${beamArrivalId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BeamArrival', 'BeamArrivalTimeRange'],
    }),
  }),
})

export const {
  useFetchBeamArrivalByDayQuery,
  useFetchBeamArrivalByTimeRangeQuery,
  useAddBeamArrivalMutation,
  useUpdateBeamArrivalMutation,
  useDeleteBeamArrivalMutation,
} = beamArrivalApi
