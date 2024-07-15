import {
  BeamShipmentByDayResponse,
  BeamShipmentByTimeRangeResponse,
  BeamShipmentFetchByDayParams,
  BeamShipmentFetchTimeRangeParams,
  BeamShipmentParams,
  CreateBeamShipmentParams,
  UpdateBeamShipmentParams,
} from '@/entities/beam-shipment'
import { baseApi } from '@/shared/api'

export const beamShipmentApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchBeamShipmentByDay: build.query<BeamShipmentByDayResponse, BeamShipmentFetchByDayParams>({
      query: ({ date }) => ({
        url: `beam-shipment/get/day-data-stats`,
        params: {
          date,
        },
      }),
      providesTags: ['BeamShipment'],
    }),

    fetchBeamShipmentByTimeRange: build.query<
      BeamShipmentByTimeRangeResponse,
      BeamShipmentFetchTimeRangeParams
    >({
      query: ({ startDate, endDate }) => ({
        url: `beam-shipment/get/time-range-stats`,
        params: {
          startDate,
          endDate,
        },
      }),
      providesTags: ['BeamShipmentTimeRange'],
    }),

    addBeamShipment: build.mutation<void, CreateBeamShipmentParams[]>({
      query: params => ({
        url: 'beam-shipment',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['BeamShipment', 'BeamShipmentTimeRange'],
    }),

    updateBeamShipment: build.mutation<void, UpdateBeamShipmentParams>({
      query: ({ beamShipmentId, ...params }) => ({
        url: `beam-shipment/${beamShipmentId}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['BeamShipment', 'BeamShipmentTimeRange'],
    }),

    deleteBeamShipment: build.mutation<BeamShipmentParams, number>({
      query: beamShipmentId => ({
        url: `beam-shipment/${beamShipmentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BeamShipment', 'BeamShipmentTimeRange'],
    }),
  }),
})

export const {
  useFetchBeamShipmentByDayQuery,
  useFetchBeamShipmentByTimeRangeQuery,
  useAddBeamShipmentMutation,
  useUpdateBeamShipmentMutation,
  useDeleteBeamShipmentMutation,
} = beamShipmentApi
