import { WoodClass } from '@/entities/wood-class'
import { baseApi } from '@/shared/api'

export const woodClassApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchAllWoodClasses: build.query<WoodClass[], void>({
      query: () => ({
        url: 'wood-class/list',
      }),
      providesTags: ['WoodClass'],
    }),
  }),
})

export const {
  useFetchAllWoodClassesQuery,
} = woodClassApi