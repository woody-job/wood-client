import { baseApi } from '@/shared/api'

import { WoodClass } from '../model'

export const woodClassApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllWoodClasses: build.query<WoodClass[], void>({
      query: () => ({
        url: `wood-class/list`,
      }),
      providesTags: ['AllWoodClasses'],
    }),
  }),
})

export const { useFetchAllWoodClassesQuery } = woodClassApi
