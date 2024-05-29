import { WoodCondition } from '@/entities/wood-condition'
import { baseApi } from '@/shared/api'

export const woodConditionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllWoodConditions: build.query<WoodCondition[], void>({
      query: () => ({
        url: '/wood-condition/list',
      }),
    }),
  }),
})

export const { useFetchAllWoodConditionsQuery } = woodConditionApi
