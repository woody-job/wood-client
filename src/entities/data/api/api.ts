import { baseApi } from '@/shared/api'

export const dataApi = baseApi.injectEndpoints({
  endpoints: build => ({
    deleteUserCreatedData: build.mutation<void, void>({
      query: () => ({
        url: 'data-management/delete-user-created-data',
        method: 'DELETE',
      }),
      invalidatesTags: [
        'BeamInWorkshopStats',
        'WorkshopOutStats',
        'WorkshopDailyData',
        'Arrival',
        'Shipment',
        'Dryers',
      ],
    }),
  }),
})

export const { useDeleteUserCreatedDataMutation } = dataApi
