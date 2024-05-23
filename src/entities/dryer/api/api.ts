import { Dryer, DryerWithoutId } from '@/entities/dryer'
import { baseApi } from '@/shared/api'

export const dryerApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllDryers: build.query<Dryer[], void>({
      query: () => ({
        url: 'dryer-chamber/list',
      }),
      providesTags: ['Dryers'],
    }),
    createDryer: build.mutation<Dryer, DryerWithoutId>({
      query: dryer => ({
        url: 'dryer-chamber',
        method: 'POST',
        body: dryer,
      }),
      invalidatesTags: ['Dryers'],
    }),
    updateDryer: build.mutation<Dryer, Dryer>({
      query: ({ id, ...dryer }) => ({
        url: `dryer-chamber/${id}`,
        method: 'PUT',
        body: dryer,
      }),
      invalidatesTags: ['Dryers'],
    }),
    deleteDryer: build.mutation<void, number>({
      query: id => ({
        url: `dryer-chamber/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Dryers'],
    }),
  }),
})

export const {
  useFetchAllDryersQuery,
  useCreateDryerMutation,
  useUpdateDryerMutation,
  useDeleteDryerMutation,
} = dryerApi
