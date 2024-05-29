import { Box, Skeleton, Tab, Tabs, Typography } from '@mui/material'

import { WarehouseItem } from '@/widgets/warehouseItem'
import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'

export const Warehouse = () => {
  const { data: woodConditions, isLoading: isLoadingWoodConditions } =
    useFetchAllWoodConditionsQuery()

  const { currentTab, handleChangeTab } = useSearchParamsTabs(
    appSearchParams.currentTab,
    woodConditions,
    tab => tab?.id.toString(),
    woodConditions?.[0]
  )

  return (
    <Box>
      <Typography variant='h5'>Склад</Typography>
      <Tabs value={currentTab?.id} onChange={handleChangeTab} sx={{ mt: 5 }}>
        {isLoadingWoodConditions && <Skeleton width='100px' />}
        {woodConditions &&
          woodConditions.map(tab => <Tab key={tab.name} label={tab.name} value={tab.id} />)}
      </Tabs>

      <Box display='flex' flexWrap='wrap'>
        {woodConditions &&
          currentTab &&
          woodConditions.map(tab => <WarehouseItem woodConditionId={tab.id} />)}
      </Box>
    </Box>
  )
}
