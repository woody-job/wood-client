import { baseApi } from '@/shared/api'

import {
  CreateWorkshopWoodPriceParams,
  GetWorkshopWoodPricesParams,
  UpdateWorkshopWoodPriceParams,
  WorkshopWoodPrice,
} from '../model'

export const workshopWoodPriceApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchWorkshopWoodPrices: build.query<WorkshopWoodPrice[], GetWorkshopWoodPricesParams>({
      query: ({ workshopId }) => ({
        url: `workshop-wood-prices/list/${workshopId}`,
      }),
      providesTags: ['WorkshopWoodPrices'],
    }),
    createWorkshopWoodPrice: build.mutation<void, CreateWorkshopWoodPriceParams>({
      query: createWorkshopWoodPriceParams => ({
        url: 'workshop-wood-prices',
        method: 'POST',
        body: createWorkshopWoodPriceParams,
      }),
      invalidatesTags: ['WorkshopWoodPrices'],
    }),
    updateWorkshopWoodPrice: build.mutation<void, UpdateWorkshopWoodPriceParams>({
      query: ({ workshopWoodPriceId, price }) => ({
        url: `workshop-wood-prices/${workshopWoodPriceId}`,
        method: 'PUT',
        body: { price },
      }),
      invalidatesTags: ['WorkshopWoodPrices'],
    }),
  }),
})

export const {
  useFetchWorkshopWoodPricesQuery,
  useCreateWorkshopWoodPriceMutation,
  useUpdateWorkshopWoodPriceMutation,
} = workshopWoodPriceApi
