import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tagTypes = [
  'AllUsers',
  'Roles',
  'WoodNamings',
  'AllDimensions',
  'DimensionsByWoodClass',
  'AllWoodClasses',
  'AllWorkshops',
  'WorkshopWoodPrices',
  'Dryers',
  'AllBeamInForWorkshop',
  'DryersDataById',
  'WorkshopOutForDay',
  'WorkshopDailyData',
  'BeamInWorkshopStats',
  'WorkshopOutStats',
  'WorkshopProfitStats',
  'WorkshopReportStats',
  'Arrival',
  'Shipment',
  'WorkshopProducedStats',
]
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: () => ({}),
  tagTypes,
})
