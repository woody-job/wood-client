import { baseApi } from '@/shared/api'

import { UpdateWorkshopParams, Workshop } from '../model'

export const workshopApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllWorkshops: build.query<Workshop[], void>({
      query: () => ({
        url: 'workshop/list',
      }),
      providesTags: ['AllWorkshops'],
    }),

    updateWorkshop: build.mutation<void, UpdateWorkshopParams>({
      query: ({ workshopId, workshopData }) => ({
        url: `workshop/${workshopId}`,
        method: 'PUT',
        body: workshopData,
      }),
      invalidatesTags: ['AllWorkshops'],
    }),
  }),
})

export const { useFetchAllWorkshopsQuery, useUpdateWorkshopMutation } = workshopApi
