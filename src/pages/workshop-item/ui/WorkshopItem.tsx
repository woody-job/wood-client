import { useParams } from 'react-router-dom'

import { Box, Grid, Input, Tab, Tabs, Typography } from '@mui/material'

import { WorkshopCharts } from '@/widgets/workshopCharts'
import { WorkshopDashboardCards } from '@/widgets/workshopDashboardCards'
import { WorkshopInputWoods } from '@/widgets/workshopInputWoods'
import { WorkshopOutputWoods } from '@/widgets/workshopOutputWoods'
import { WorkshopTotalTable, WorkshopTrashStatsSunburst } from '@/entities/workshop'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'
import { TimeRangeInputs } from '@/shared/ui/time-range'

export const WorkshopItem = () => {
  const { workshopId } = useParams()
  const tabs = [
    { id: 'day', name: 'За день' },
    { id: 'few-days', name: 'За несколько дней' },
  ]

  const { currentTab, handleChangeTab } = useSearchParamsTabs(
    appSearchParams.currentTab,
    tabs,
    tab => tab.id,
    tabs[0]
  )

  const today = new Date().toISOString().split('T')[0]

  return (
    <>
      <Typography variant='h5' sx={{ mb: 5 }}>
        Цех 1
      </Typography>
      <Tabs value={currentTab.id} onChange={handleChangeTab} sx={{ mt: 5 }}>
        {tabs.map(tab => (
          <Tab key={tab.name} label={tab.name} value={tab.id} />
        ))}
      </Tabs>

      <CustomTabPanel tabPanelValue={currentTab.id} value={'day'}>
        <Grid container spacing={4}>
          <Grid item xs={12} xl={3}>
            <Input type='date' value={today} sx={{ my: 3 }} />

            <WorkshopDashboardCards />
          </Grid>

          {Number(workshopId) !== 2 && (
            <Grid item md={12} lg={6} xl={4.5}>
              <WorkshopInputWoods />
            </Grid>
          )}

          <Grid item md={12} lg={6} xl={4.5}>
            <WorkshopOutputWoods />
          </Grid>
        </Grid>

        <WorkshopTrashStatsSunburst />
      </CustomTabPanel>

      <CustomTabPanel tabPanelValue={currentTab.id} value={'few-days'}>
        <TimeRangeInputs />

        <Box mt={3}>
          <WorkshopCharts />
        </Box>

        <Box mt={3}>
          <WorkshopTotalTable />
        </Box>
      </CustomTabPanel>
    </>
  )
}
