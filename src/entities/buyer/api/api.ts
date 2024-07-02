import { baseApi } from '@/shared/api'

import { Buyer, BuyerWithoutId } from '../model'

export const buyerApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllBuyers: build.query<Buyer[], void>({
      query: () => ({
        url: 'buyer/list',
      }),
      providesTags: ['Buyers'],
    }),

    createBuyer: build.mutation<Buyer, BuyerWithoutId>({
      query: buyer => ({
        url: 'buyer',
        method: 'POST',
        body: buyer,
      }),
      invalidatesTags: ['Buyers'],
    }),

    deleteBuyer: build.mutation<void, number>({
      query: id => ({
        url: `buyer/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Buyers'],
    }),

    updateBuyer: build.mutation<Buyer, Buyer>({
      query: ({ id, ...newBuyer }) => ({
        url: `buyer/${id}`,
        method: 'PUT',
        body: newBuyer,
      }),
      invalidatesTags: ['Buyers'],
    }),
  }),
})

export const {
  useCreateBuyerMutation,
  useFetchAllBuyersQuery,
  useDeleteBuyerMutation,
  useUpdateBuyerMutation,
} = buyerApi
