import { CreateWoodNamingParams, UpdateWoodNamingParams, WoodNaming } from '@/entities/wood-naming'
import { baseApi } from '@/shared/api'

export const woodNamingApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllWoodNamings: build.query<WoodNaming[], void>({
      query: () => ({
        url: 'wood-naming/list',
      }),
      providesTags: ['WoodNamings'],
    }),

    createWoodNaming: build.mutation<WoodNaming, CreateWoodNamingParams>({
      query: woodNaming => ({
        url: 'wood-naming',
        method: 'POST',
        body: woodNaming,
      }),
      invalidatesTags: ['WoodNamings'],
    }),

    deleteWoodNaming: build.mutation<void, number>({
      query: id => ({
        url: `wood-naming/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WoodNamings'],
    }),

    updateWoodNaming: build.mutation<WoodNaming, UpdateWoodNamingParams>({
      query: ({ id, ...newWoodNaming }) => ({
        url: `wood-naming/${id}`,
        method: 'PUT',
        body: newWoodNaming,
      }),
      invalidatesTags: ['WoodNamings'],
    }),
  }),
})

export const {
  useCreateWoodNamingMutation,
  useFetchAllWoodNamingsQuery,
  useDeleteWoodNamingMutation,
  useUpdateWoodNamingMutation,
} = woodNamingApi
