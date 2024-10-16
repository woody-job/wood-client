import { Box } from '@mui/material'

import { useFetchDryerDataListQuery } from '@/entities/dryer'
import { WarehouseTable } from '@/entities/warehouse'
import { TableFullscreen } from '@/shared/ui'
import { TableTotalInfo } from '@/shared/ui/tableTotalInfo'

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
      <TableTotalInfo totalAmount={dryerData?.totalAmount} totalVolume={dryerData?.totalVolume} />
    </Box>
  )
}
