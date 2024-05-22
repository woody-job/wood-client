import { baseApi } from '@/shared/api'
import { WoodType } from '@/entities/wood-type'

export const woodTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchWoodTypes: build.query<WoodType[], void>({
      query: () => ({
        url: 'wood-type/list',
      }),
    }),
  }),
})

export const {useFetchWoodTypesQuery} = woodTypeApi