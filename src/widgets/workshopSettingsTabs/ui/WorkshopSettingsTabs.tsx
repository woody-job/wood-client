import { FC } from 'react'

import { Box, CircularProgress, Tab, Tabs } from '@mui/material'

import { useFetchAllWorkshopsQuery } from '@/entities/workshop/api'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { CustomTabPanel, TableFullscreen } from '@/shared/ui'

import { WorkshopPrices } from './workshopPrices'
import { WorkshopWoodPricesTable } from './workshopWoodPricesTable'

const getTabValue = (id: number) => 'workshop' + id

export const WorkshopSettingsTabs: FC = () => {
  const { data: workshops, isLoading: isLoadingWorkshops } = useFetchAllWorkshopsQuery()

  const { currentTab, handleChangeTab } = useSearchParamsTabs(
    appSearchParams.currentTab,
    workshops,
    tab => {
      if (tab) {
        return getTabValue(tab.id)
      }

      return ''
    },
    workshops ? workshops[0] : null
  )

  const currentTabValue = currentTab ? getTabValue(currentTab.id) : 0

  if (isLoadingWorkshops) {
    return (
      <Box sx={{ height: 800, display: 'grid', placeContent: 'center' }}>
        <CircularProgress size={60} />
      </Box>
    )
  }

  return (
    <Box>
      <Tabs value={currentTabValue} onChange={handleChangeTab} sx={{ mt: 5 }}>
        {workshops?.map(workshop => (
          <Tab key={workshop.name} label={workshop.name} value={getTabValue(workshop.id)} />
        ))}
      </Tabs>

      {workshops?.map(workshop => {
        return (
          <CustomTabPanel
            key={workshop.name}
            value={currentTabValue as string}
            tabPanelValue={getTabValue(workshop.id)}
          >
            <WorkshopPrices workshop={workshop} />
            <TableFullscreen
              renderTable={props => <WorkshopWoodPricesTable workshop={workshop} {...props} />}
            />
          </CustomTabPanel>
        )
      })}
    </Box>
  )
}
