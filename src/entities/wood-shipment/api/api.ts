import {
  ShipmentByDayResponse,
  ShipmentByTimeRangeResponse,
  ShipmentFetchByDayParams,
  ShipmentFetchTimeRangeParams,
  ShipmentParams,
  UpdateShipmentParams,
} from '@/entities/wood-shipment'
import { baseApi } from '@/shared/api'

export const woodShipmentApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchWoodShipmentByDay: build.query<ShipmentByDayResponse, ShipmentFetchByDayParams>({
      query: ({ woodConditionId, ...params }) => ({
        url: `wood-shipment/get/day-data-stats/${woodConditionId}`,
        params: params,
      }),
      providesTags: ['Shipment'],
    }),

    fetchWoodShipmentByTimeRange: build.query<
      ShipmentByTimeRangeResponse,
      ShipmentFetchTimeRangeParams
    >({
      query: ({ startDate, endDate }) => ({
        url: `wood-shipment/get/time-range-stats`,
        params: {
          startDate,
          endDate,
        },
      }),
      providesTags: ['ShipmentTimeRange'],
    }),

    addWoodShipment: build.mutation<ShipmentParams, ShipmentParams>({
      query: arrival => ({
        url: 'wood-shipment',
        method: 'POST',
        body: arrival,
      }),
      invalidatesTags: ['Shipment'],
    }),

    updateWoodShipment: build.mutation<ShipmentParams, UpdateShipmentParams>({
      query: ({ shipmentId, ...params }) => ({
        url: `wood-shipment/${shipmentId}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['Shipment'],
    }),

    deleteWoodShipment: build.mutation<ShipmentParams, number>({
      query: shipmentId => ({
        url: `wood-shipment/${shipmentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Shipment'],
    }),
  }),
})

export const {
  useFetchWoodShipmentByDayQuery,
  useFetchWoodShipmentByTimeRangeQuery,
  useAddWoodShipmentMutation,
  useUpdateWoodShipmentMutation,
  useDeleteWoodShipmentMutation,
} = woodShipmentApi
