import {
  Dryer,
  DryerDataList,
  DryerDataParams,
  DryerDataResponse,
  DryerStats,
} from '@/entities/dryer'
import { baseApi } from '@/shared/api'

export const dryerApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllDryers: build.query<Dryer[], void>({
      query: () => ({
        url: 'dryer-chamber/list',
      }),
      providesTags: ['Dryers'],
    }),

    createDryer: build.mutation<Dryer, void>({
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

    fetchDryerDataById: build.query<DryerDataResponse, number>({
      query: dryerId => ({
        url: `dryer-chamber-data/get/chamber-data/${dryerId}`,
      }),
      providesTags: ['DryersDataById'],
    }),

    bringIn: build.mutation<DryerDataParams, DryerDataParams>({
      query: ({ dryerChamberId, ...dryer }) => ({
        url: `dryer-chamber-data/bring-in/${dryerChamberId}`,
        method: 'POST',
        body: dryer,
      }),
      invalidatesTags: ['DryersDataById'],
    }),

    takeOut: build.mutation<void, number>({
      query: dryerChamberId => ({
        url: `dryer-chamber-data/take-out/${dryerChamberId}`,
        method: 'POST',
      }),
      invalidatesTags: ['DryersDataById'],
    }),

    fetchDryerDataList: build.query<DryerDataList, void>({
      query: () => ({
        url: `dryer-chamber-data/list`,
      }),
      providesTags: ['Dryers'],
    }),

    fetchDryerStats: build.query<DryerStats, void>({
      query: () => ({
        url: `dryer-chamber-data/get/stats`,
      }),
    }),
  }),
})

export const {
  useFetchAllDryersQuery,
  useCreateDryerMutation,
  useUpdateDryerMutation,
  useDeleteDryerMutation,
  useFetchDryerDataByIdQuery,
  useBringInMutation,
  useTakeOutMutation,
  useFetchDryerDataListQuery,
  useFetchDryerStatsQuery,
} = dryerApi
