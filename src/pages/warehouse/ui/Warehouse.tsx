import { Box, Skeleton, Tab, Tabs, Typography } from '@mui/material'

import { WarehouseDryer } from '@/widgets/warehouseDryer'
import { WarehouseItem } from '@/widgets/warehouseItem'
import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'

export type WarehouseTab = { id: string | number }

export const Warehouse = () => {
  const { data: woodConditions, isLoading: isLoadingWoodConditions } =
    useFetchAllWoodConditionsQuery()

  const tabs: WarehouseTab[] | undefined = woodConditions
    ? [...woodConditions, { id: 'dryer' }]
    : undefined

  const { currentTab, handleChangeTab } = useSearchParamsTabs<WarehouseTab | undefined>(
    appSearchParams.currentTab,
    tabs,
    tab => tab?.id.toString(),
    tabs?.[0]
  )

  return (
    <Box>
      <Typography variant='h5'>Склад доски</Typography>
      <Tabs value={currentTab?.id.toString()} onChange={handleChangeTab} sx={{ mt: 5 }}>
        {isLoadingWoodConditions && (
          <Box display='flex' gap={1}>
            <Skeleton width='100px' height='40px' />
            <Skeleton width='100px' height='40px' />
            <Skeleton width='100px' height='40px' />
          </Box>
        )}
        {woodConditions &&
          woodConditions.map(tab => (
            <Tab key={tab.id} label={tab.name} value={tab.id.toString()} />
          ))}
        {!isLoadingWoodConditions && <Tab label='Сушилка' value='dryer' />}
      </Tabs>

      <Box>
        {currentTab &&
          woodConditions?.map(tab => (
            <CustomTabPanel
              key={tab.id}
              tabPanelValue={currentTab.id.toString()}
              value={tab.id.toString()}
            >
              <WarehouseItem key={tab.id} woodConditionName={tab.name} woodConditionId={tab.id} />
            </CustomTabPanel>
          ))}
        {currentTab && (
          <CustomTabPanel tabPanelValue={currentTab.id.toString()} value='dryer'>
            <WarehouseDryer />
          </CustomTabPanel>
        )}
      </Box>
    </Box>
  )
}
