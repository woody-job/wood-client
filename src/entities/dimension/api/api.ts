import { baseApi } from '@/shared/api'
import { Dimension } from '@/entities/dimension'

export const dimensionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchDimensionsByWoodClass: build.query<Dimension[], number>({
      query: (woodClassId) => ({
        url: `/dimension/list/${woodClassId}`,
      }),
      providesTags: ['Dimensions'],
    }),
  }),
})

export const {
  useFetchDimensionsByWoodClassQuery,
} = dimensionApi