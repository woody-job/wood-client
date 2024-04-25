import { Box, Tab, Tabs } from '@mui/material'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { appSearchParams } from '@/shared/constants'
import { CustomTabPanel } from '@/shared/ui'
import { WorkshopPrices } from '@/widgets/workshopPrices'
import { WorkshopTable } from '@/widgets/workshopTable'

const getTabValue = (id: number) => 'workshop' + id

export const Workshops = () => {
  const workshops = [
    { id: 1, name: 'Цех 1' },
    { id: 2, name: 'Цех 2' },
  ]

  const { currentTab, handleChangeTab } = useSearchParamsTabs(
    appSearchParams.currentTab,
    workshops,
    tab => getTabValue(tab.id),
    workshops[0]
  )

  const currentTabValue = getTabValue(currentTab.id)

  return (
    <Box>
      <Tabs value={currentTabValue} onChange={handleChangeTab} sx={{ mt: 5 }}>
        {workshops.map(tab => (
          <Tab key={tab.name} label={tab.name} value={getTabValue(tab.id)} />
        ))}
      </Tabs>

      {workshops.map(tab => (
        <CustomTabPanel key={tab.name} value={currentTabValue} tabPanelValue={getTabValue(tab.id)}>
          <WorkshopPrices workshopId={tab.id} />

          <WorkshopTable workshopsId={tab.id} />
        </CustomTabPanel>
      ))}
    </Box>
  )
}
