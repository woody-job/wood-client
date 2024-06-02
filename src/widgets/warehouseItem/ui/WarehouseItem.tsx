import { FC } from 'react'

import { Box, Skeleton } from '@mui/material'

import { useFetchWarehouseQuery, WarehouseSunburst } from '@/entities/warehouse'

export type WarehouseItemProps = {
  woodConditionId: number
}

export const WarehouseItem: FC<WarehouseItemProps> = ({ woodConditionId }) => {
  const { data: warehouse, isLoading: isLoadingWarehouse } = useFetchWarehouseQuery(woodConditionId)

  return (
    <Box sx={{ height: '70vh' }}>
      {isLoadingWarehouse ? (
        <Skeleton variant='circular' sx={{ aspectRatio: '1 / 1', height: '70vh' }} />
      ) : (
        warehouse && (
          <WarehouseSunburst data={warehouse.sunburstData} total={warehouse.totalVolume} />
        )
      )}
    </Box>
  )
}
