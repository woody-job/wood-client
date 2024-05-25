import { WoodType } from '@/entities/wood-type'
import { baseApi } from '@/shared/api'

export const woodTypeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllWoodTypes: build.query<WoodType[], void>({
      query: () => ({
        url: 'wood-type/list',
        method: 'GET',
      }),
    }),
  }),
})

export const { useFetchAllWoodTypesQuery } = woodTypeApi
