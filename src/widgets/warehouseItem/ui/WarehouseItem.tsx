import { FC } from 'react'

import { Box } from '@mui/material'

import { useFetchWarehouseQuery, WarehouseTable } from '@/entities/warehouse'
import { TableFullscreen } from '@/shared/ui'
import { TableTotalInfo } from '@/shared/ui/tableTotalInfo'

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
      <TableTotalInfo totalAmount={warehouse?.totalAmount} totalVolume={warehouse?.totalVolume} />
    </Box>
  )
}
