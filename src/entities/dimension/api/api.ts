import { baseApi } from '@/shared/api'
import {
  CreateDimensionParams,
  DeleteDimensionParams,
  Dimension,
  UpdateDimensionParams,
} from '../model'

export const dimensionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllDimensions: build.query<Dimension[], void>({
      query: () => ({
        url: `dimension/list`,
      }),
      providesTags: ['AllDimensions'],
    }),

    fetchDimensionsByWoodClass: build.query<Dimension[], number>({
      query: woodClassId => ({
        url: `dimension/list/${woodClassId}`,
      }),
      providesTags: ['DimensionsByWoodClass'],
    }),

    createDimension: build.mutation<void, CreateDimensionParams>({
      query: createDimensionParams => ({
        url: 'dimension',
        method: 'POST',
        body: createDimensionParams,
      }),
      invalidatesTags: ['AllDimensions', 'DimensionsByWoodClass'],
    }),

    updateDimension: build.mutation<void, UpdateDimensionParams>({
      query: ({ dimensionId, dimensionData }) => ({
        url: `dimension/${dimensionId}`,
        method: 'PUT',
        body: dimensionData,
      }),
      invalidatesTags: ['AllDimensions', 'DimensionsByWoodClass'],
    }),

    deleteDimension: build.mutation<void, DeleteDimensionParams>({
      query: ({ dimensionId }) => ({
        url: `dimension/${dimensionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AllDimensions', 'DimensionsByWoodClass'],
    }),
  }),
})

export const {
  useCreateDimensionMutation,
  useUpdateDimensionMutation,
  useDeleteDimensionMutation,
  useFetchAllDimensionsQuery,
  useFetchDimensionsByWoodClassQuery,
} = dimensionApi
