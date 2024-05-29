import { Box, Skeleton, Tab, Tabs, Typography } from '@mui/material'

import { WarehouseDryer } from '@/widgets/warehouseDryer'
import { WarehouseItem } from '@/widgets/warehouseItem'
import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'

export type WarehouseTab = { name: string }

export const Warehouse = () => {
  const { data: woodConditions, isLoading: isLoadingWoodConditions } =
    useFetchAllWoodConditionsQuery()

  const tabs: WarehouseTab[] | undefined = woodConditions
    ? [...woodConditions, { name: 'Сушилка' }]
    : undefined

  const { currentTab, handleChangeTab } = useSearchParamsTabs<WarehouseTab | undefined>(
    appSearchParams.currentTab,
    tabs,
    tab => tab?.name.toString(),
    woodConditions?.[0]
  )

  return (
    <Box>
      <Typography variant='h5'>Склад</Typography>
      <Tabs value={currentTab?.name} onChange={handleChangeTab} sx={{ mt: 5 }}>
        {isLoadingWoodConditions && (
          <Box display='flex' gap={1}>
            <Skeleton width='100px' height='40px' />
            <Skeleton width='100px' height='40px' />
            <Skeleton width='100px' height='40px' />
          </Box>
        )}
        {woodConditions &&
          woodConditions.map(tab => <Tab key={tab.name} label={tab.name} value={tab.name} />)}
        {!isLoadingWoodConditions && <Tab label='Сушилка' value='Сушилка' />}
      </Tabs>

      <Box display='flex' flexWrap='wrap'>
        {currentTab &&
          woodConditions?.map(tab => (
            <CustomTabPanel tabPanelValue={currentTab.name} value={tab.name}>
              <WarehouseItem key={tab.id} woodConditionId={tab.id} />
            </CustomTabPanel>
          ))}
        {currentTab && (
          <CustomTabPanel tabPanelValue={currentTab.name} value='Сушилка'>
            <WarehouseDryer />
          </CustomTabPanel>
        )}
      </Box>
    </Box>
  )
}
