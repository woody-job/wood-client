import {
  ShipmentByDayResponse,
  ShipmentByRangeResponse,
  ShipmentFetchByDayParams,
  ShipmentFetchByRangeParams,
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

    fetchWoodShipmentByRange: build.query<ShipmentByRangeResponse, ShipmentFetchByRangeParams>({
      query: ({ woodConditionId, ...params }) => ({
        url: `wood-shipment/get/day-range-stats/${woodConditionId}`,
        params: params,
      }),
      providesTags: ['Shipment'],
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
  useFetchWoodShipmentByRangeQuery,
  useAddWoodShipmentMutation,
  useUpdateWoodShipmentMutation,
  useDeleteWoodShipmentMutation,
} = woodShipmentApi
