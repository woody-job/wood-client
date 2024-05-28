import {
  ShipmentFetchStatsParams,
  ShipmentParams,
  ShipmentStatsResponse,
} from '@/entities/wood-shipment'
import { baseApi } from '@/shared/api'

export const woodShipmentApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchWoodShipment: build.query<ShipmentStatsResponse, ShipmentFetchStatsParams>({
      query: ({ woodConditionId, ...params }) => ({
        url: `wood-shipment/get/stats/${woodConditionId}`,
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

    updateWoodShipment: build.mutation<ShipmentParams, ShipmentParams>({
      query: arrival => ({
        url: 'wood-shipment',
        method: 'PUT',
        body: arrival,
      }),
      invalidatesTags: ['Shipment'],
    }),

    deleteWoodShipment: build.mutation<ShipmentParams, number>({
      query: arrivalId => ({
        url: `wood-shipment/${arrivalId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Shipment'],
    }),
  }),
})

export const {
  useFetchWoodShipmentQuery,
  useAddWoodShipmentMutation,
  useUpdateWoodShipmentMutation,
  useDeleteWoodShipmentMutation,
} = woodShipmentApi
