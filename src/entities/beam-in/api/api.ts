import { baseApi } from '@/shared/api'

import {
  BeamSize,
  CreateBeamInForWorkshopParams,
  DeleteBeamInForWorkshopParams,
  GetBeamInForWorkshopParams,
  GetBeamInResponse,
  UpdateBeamInForWorkshopParams,
} from '../model'

export const beamInApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllBeamInForWorkshop: build.query<GetBeamInResponse, GetBeamInForWorkshopParams>({
      query: ({ workshopId, startDate, endDate }) => ({
        url: `beam-in/list/${workshopId}`,
        params: { startDate, endDate },
      }),
      providesTags: ['AllBeamInForWorkshop'],
    }),

    fetchAllBeamSizes: build.query<BeamSize[], void>({
      query: () => ({
        url: `beam-size/list`,
      }),
    }),

    fetchBeamSizesByLength: build.query<BeamSize[], { length: number }>({
      query: ({ length }) => ({
        url: `beam-size/list/${length}`,
      }),
    }),

    createBeamInForWorkshop: build.mutation<void, CreateBeamInForWorkshopParams>({
      query: createBeamInForWorkshopParams => ({
        url: `beam-in`,
        method: 'POST',
        body: createBeamInForWorkshopParams,
      }),
      invalidatesTags: ['AllBeamInForWorkshop', 'WorkshopOutForDay', 'WorkshopDailyData'],
    }),

    updateBeamInForWorkshop: build.mutation<void, UpdateBeamInForWorkshopParams>({
      query: ({ beamInId, beamInData }) => ({
        url: `beam-in/${beamInId}`,
        method: 'PUT',
        body: beamInData,
      }),
      invalidatesTags: ['AllBeamInForWorkshop', 'WorkshopOutForDay', 'WorkshopDailyData'],
    }),

    deleteBeamInForWorkshop: build.mutation<void, DeleteBeamInForWorkshopParams>({
      query: ({ beamInId }) => ({
        url: `beam-in/${beamInId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AllBeamInForWorkshop', 'WorkshopOutForDay', 'WorkshopDailyData'],
    }),
  }),
})

export const {
  useFetchAllBeamInForWorkshopQuery,
  useFetchAllBeamSizesQuery,
  useFetchBeamSizesByLengthQuery,
  useCreateBeamInForWorkshopMutation,
  useUpdateBeamInForWorkshopMutation,
  useDeleteBeamInForWorkshopMutation,
} = beamInApi
