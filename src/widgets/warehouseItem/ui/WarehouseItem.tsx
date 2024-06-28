import { FC } from 'react'

import { Box, Typography } from '@mui/material'

import { useFetchWarehouseQuery, WarehouseTable } from '@/entities/warehouse'
import { TableFullscreen } from '@/shared/ui'

export type WarehouseItemProps = {
  woodConditionId: number
  woodConditionName: string
}

export const WarehouseItem: FC<WarehouseItemProps> = ({ woodConditionId, woodConditionName }) => {
  const { data: warehouse, isLoading: isLoadingWarehouse } = useFetchWarehouseQuery(woodConditionId)

  return (
    <Box sx={{ mt: 3 }}>
      <TableFullscreen
        renderTable={props => (
          <WarehouseTable
            {...props}
            warehouseData={warehouse?.data}
            tableName={woodConditionName}
            isLoadingWarehouseTableData={isLoadingWarehouse}
          />
        )}
      />
      <Typography sx={{ mt: 1, mb: 2 }}>Всего м3: {warehouse?.totalVolume}</Typography>
    </Box>
  )
}
