import { Box, Skeleton } from '@mui/material'

import { useFetchDryerDataListQuery } from '@/entities/dryer'
import { WarehouseSunburst } from '@/entities/warehouse'

export const WarehouseDryer = () => {
  const { data: dryerData, isLoading: isLoadingDryersData } = useFetchDryerDataListQuery()

  return (
    <Box sx={{ height: '70vh' }}>
      {isLoadingDryersData ? (
        <Skeleton variant='circular' sx={{ aspectRatio: '1 / 1', height: '70vh' }} />
      ) : (
        dryerData && (
          <WarehouseSunburst data={dryerData.sunburstData} total={dryerData.totalVolume} />
        )
      )}
    </Box>
  )
}
