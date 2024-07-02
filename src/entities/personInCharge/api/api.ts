import { baseApi } from '@/shared/api'

import { PersonInCharge, PersonInChargeWithoutId } from '../model'

export const personInChargeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllPersonsInCharge: build.query<PersonInCharge[], void>({
      query: () => ({
        url: 'person-in-charge/list',
      }),
      providesTags: ['PersonsInCharge'],
    }),

    createPersonInCharge: build.mutation<PersonInCharge, PersonInChargeWithoutId>({
      query: personInCharge => ({
        url: 'person-in-charge',
        method: 'POST',
        body: personInCharge,
      }),
      invalidatesTags: ['PersonsInCharge'],
    }),

    deletePersonInCharge: build.mutation<void, number>({
      query: id => ({
        url: `person-in-charge/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PersonsInCharge'],
    }),

    updatePersonInCharge: build.mutation<PersonInCharge, PersonInCharge>({
      query: ({ id, ...newPersonInCharge }) => ({
        url: `person-in-charge/${id}`,
        method: 'PUT',
        body: newPersonInCharge,
      }),
      invalidatesTags: ['PersonsInCharge'],
    }),
  }),
})

export const {
  useCreatePersonInChargeMutation,
  useFetchAllPersonsInChargeQuery,
  useDeletePersonInChargeMutation,
  useUpdatePersonInChargeMutation,
} = personInChargeApi
