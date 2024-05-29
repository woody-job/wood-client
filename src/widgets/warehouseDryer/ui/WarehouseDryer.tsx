import { Skeleton } from '@mui/material'

import { useFetchDryerDataListQuery } from '@/entities/dryer'
import { WarehouseSunburst } from '@/entities/warehouse'

export const WarehouseDryer = () => {
  const { data: dryerData, isLoading: isLoadingDryersData } = useFetchDryerDataListQuery()

  return isLoadingDryersData ? (
    <Skeleton variant='circular' width='750px' height='750px' />
  ) : (
    dryerData && <WarehouseSunburst data={dryerData.sunburstData} total={dryerData.totalVolume} />
  )
}
