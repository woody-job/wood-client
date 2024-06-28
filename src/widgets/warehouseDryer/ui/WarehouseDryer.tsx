import { Box, Typography } from '@mui/material'

import { useFetchDryerDataListQuery } from '@/entities/dryer'
import { WarehouseTable } from '@/entities/warehouse'
import { TableFullscreen } from '@/shared/ui'

export const WarehouseDryer = () => {
  const { data: dryerData, isLoading: isLoadingDryersData } = useFetchDryerDataListQuery()

  return (
    <Box sx={{ mt: 3 }}>
      <TableFullscreen
        renderTable={props => (
          <WarehouseTable
            {...props}
            warehouseData={dryerData?.data}
            tableName={'сушилка'}
            isLoadingWarehouseTableData={isLoadingDryersData}
          />
        )}
      />
      <Typography sx={{ mt: 1, mb: 2 }}>Всего м3: {dryerData?.totalVolume}</Typography>
    </Box>
  )
}
