import {
  BringWoodInDryerParams,
  CreateDryerParams,
  Dryer,
  DryerDataList,
  DryerDataParams,
  DryerDataResponse,
  DryerInfoData,
  DryerStats,
  GetDryerInfoParams,
  UpdateDryerParams,
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

    fetchAllWoodsGoneThroughDryer: build.query<DryerInfoData, GetDryerInfoParams>({
      query: ({ startDate, endDate }) => ({
        url: `/dryer-chamber-data/all-records`,
        params: {
          startDate,
          endDate,
        },
      }),
    }),

    createDryer: build.mutation<void, CreateDryerParams>({
      query: dryer => ({
        url: 'dryer-chamber',
        method: 'POST',
        body: dryer,
      }),
      invalidatesTags: ['Dryers'],
    }),

    updateDryer: build.mutation<Dryer, UpdateDryerParams>({
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
        url: `dryer-chamber-data/list/${dryerId}`,
      }),
      providesTags: ['DryersDataById'],
    }),

    bringIn: build.mutation<DryerDataParams, BringWoodInDryerParams>({
      query: ({ dryerChamberId, woods }) => ({
        url: `dryer-chamber-data/bring-in/${dryerChamberId}`,
        method: 'POST',
        body: woods,
      }),
      invalidatesTags: ['DryersDataById', 'Dryers'],
    }),

    takeOut: build.mutation<void, number>({
      query: dryerChamberId => ({
        url: `dryer-chamber-data/take-out/${dryerChamberId}`,
        method: 'POST',
      }),
      invalidatesTags: ['DryersDataById', 'Dryers'],
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
  useFetchAllWoodsGoneThroughDryerQuery,
  useCreateDryerMutation,
  useUpdateDryerMutation,
  useDeleteDryerMutation,
  useFetchDryerDataByIdQuery,
  useBringInMutation,
  useTakeOutMutation,
  useFetchDryerDataListQuery,
  useFetchDryerStatsQuery,
} = dryerApi
