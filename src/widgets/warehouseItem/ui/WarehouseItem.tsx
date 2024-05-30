import { FC } from 'react'

import { Skeleton } from '@mui/material'

import { useFetchWarehouseQuery, WarehouseSunburst } from '@/entities/warehouse'

export type WarehouseItemProps = {
  woodConditionId: number
}

export const WarehouseItem: FC<WarehouseItemProps> = ({ woodConditionId }) => {
  const { data: warehouse, isLoading: isLoadingWarehouse } = useFetchWarehouseQuery(woodConditionId)

  return isLoadingWarehouse ? (
    <Skeleton variant='circular' width='750px' height='750px' />
  ) : (
    warehouse && <WarehouseSunburst data={warehouse.sunburstData} total={warehouse.totalVolume} />
  )
}
