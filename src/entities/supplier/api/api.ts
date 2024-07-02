import { Supplier, SupplierWithoutId } from '@/entities/supplier'
import { baseApi } from '@/shared/api'

export const supplierApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchAllSuppliers: build.query<Supplier[], void>({
      query: () => ({
        url: 'supplier/list',
      }),
      providesTags: ['Suppliers'],
    }),

    createSupplier: build.mutation<Supplier, SupplierWithoutId>({
      query: supplier => ({
        url: 'supplier',
        method: 'POST',
        body: supplier,
      }),
      invalidatesTags: ['Suppliers'],
    }),

    deleteSupplier: build.mutation<void, number>({
      query: id => ({
        url: `supplier/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Suppliers'],
    }),

    updateSupplier: build.mutation<Supplier, Supplier>({
      query: ({ id, ...newSupplier }) => ({
        url: `supplier/${id}`,
        method: 'PUT',
        body: newSupplier,
      }),
      invalidatesTags: ['Suppliers'],
    }),
  }),
})

export const {
  useCreateSupplierMutation,
  useFetchAllSuppliersQuery,
  useDeleteSupplierMutation,
  useUpdateSupplierMutation,
} = supplierApi
