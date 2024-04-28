import { DimensionsSunburst } from '@/entities/dimension'
import { data } from './Warehouse.constants'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'
import { Box, Tab, Tabs, Typography } from '@mui/material'

export const Warehouse = () => {
  const tabIds = {
    dryWood: 'dry-wood',
    wetWood: 'wet-wood',
    dryer: 'dryer',
  }

  const tabs = [
    { id: tabIds.dryWood, name: 'Сухая доска' },
    { id: tabIds.wetWood, name: 'Сырая доска' },
    { id: tabIds.dryer, name: 'Сушилка' },
  ]

  const { currentTab, handleChangeTab } = useSearchParamsTabs(
    appSearchParams.currentTab,
    tabs,
    tab => tab.id,
    tabs[0]
  )

  return (
    <Box>
      <Typography variant='h5'>Склад</Typography>
      <Tabs value={currentTab.id} onChange={handleChangeTab} sx={{ mt: 5 }}>
        {tabs.map(tab => (
          <Tab key={tab.name} label={tab.name} value={tab.id} />
        ))}
      </Tabs>

      <CustomTabPanel tabPanelValue={currentTab.id} value={tabIds.dryWood}>
        <DimensionsSunburst data={data} />
      </CustomTabPanel>

      <CustomTabPanel tabPanelValue={currentTab.id} value={tabIds.wetWood}>
        <DimensionsSunburst data={data} />
      </CustomTabPanel>

      <CustomTabPanel tabPanelValue={currentTab.id} value={tabIds.dryer}>
        <DimensionsSunburst data={data} />
      </CustomTabPanel>
    </Box>
  )
}
