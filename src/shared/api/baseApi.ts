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
  'ArrivalTimeRange',
  'Shipment',
  'ShipmentTimeRange',
  'WorkshopCurrentStats',
  'WorkshopProducedStats',
  'Warehouse',
  'WarehouseStats',
  'Suppliers',
  'Buyers',
  'PersonInCharge',
  'BeamShipment',
  'BeamShipmentTimeRange',
  'BeamWarehouse',
]
export const baseApi = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes,
})
