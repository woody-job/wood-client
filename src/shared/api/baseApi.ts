import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithAuth } from '@/shared/api/baseQueryAuth.ts'

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
  'WorkshopCurrentStats',
  'WorkshopProducedStats',
  'Warehouse',
  'WarehouseStats',
]
export const baseApi = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes,
})
