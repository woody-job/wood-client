import { useParams } from 'react-router-dom'

import { Box, Divider, Grid, Tab, Tabs, Typography } from '@mui/material'

import { WorkshopCharts } from '@/widgets/workshopCharts'
import { WorkshopDashboardCards } from '@/widgets/workshopDashboardCards'
import { WorkshopInputWoods } from '@/widgets/workshopInputWoods'
import { WorkshopOutputWoods } from '@/widgets/workshopOutputWoods'
import {
  WorkshopTotalTable,
  WorkshopTrashStatsSunburst,
  useFetchAllWorkshopsQuery,
} from '@/entities/workshop'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { CustomTabPanel, DatePicker } from '@/shared/ui'
import { TimeRangeInputs } from '@/shared/ui/time-range'
import { FC, useMemo, useState } from 'react'
import { useFetchWorkshopOutForDateQuery } from '@/entities/workshop-out'
import dayjs from 'dayjs'

export const WorkshopItem: FC = () => {
  const { workshopId } = useParams()
  const tabs = [
    { id: 'day', name: 'За день' },
    { id: 'few-days', name: 'За несколько дней' },
  ]

  const { data: workshops } = useFetchAllWorkshopsQuery()

  const { currentTab, handleChangeTab } = useSearchParamsTabs(
    appSearchParams.currentTab,
    tabs,
    tab => tab.id,
    tabs[0]
  )

  // По дефолту открывается предыдущий день
  const [date, setDate] = useState(dayjs().subtract(1, 'days'))

  // По дефолту открывается позавчера/вчера
  const [timeRange, setTimeRange] = useState({ startDate: dayjs(), endDate: dayjs() })

  const currentWorkshop = useMemo(
    () => workshops?.find(workshop => `${workshop.id}` === workshopId),
    [workshops, workshopId]
  )

  const { data: workshopOut, isLoading: isWorkshopOutLoading } = useFetchWorkshopOutForDateQuery(
    { workshopId: workshopId ? Number(workshopId) : -1, date: date.toISOString() },
    { skip: !workshopId, refetchOnMountOrArgChange: true }
  )

  const workshopOutData = workshopOut ? workshopOut.data : []
  const workshopOutSunburstData = workshopOut ? workshopOut.sunburstData : []
  const totalWorkshopOutVolume = workshopOut?.totalWorkshopOutVolume
    ? workshopOut.totalWorkshopOutVolume
    : 0

  return (
    <>
      <Box px={1.5}>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          {currentWorkshop?.name}
        </Typography>
        <Tabs value={currentTab.id} onChange={handleChangeTab} sx={{ mt: 1 }}>
          {tabs.map(tab => (
            <Tab key={tab.name} label={tab.name} value={tab.id} />
          ))}
        </Tabs>
      </Box>

      <CustomTabPanel tabPanelValue={currentTab.id} value={'day'}>
        <Box>
          <Box sx={{ mb: 2, mt: 1 }} width={200}>
            <DatePicker
              value={date}
              onAccept={value => {
                if (value) {
                  setDate(value)
                }
              }}
            />
          </Box>

          <Grid container gap={3}>
            <Grid item xs={12} md={12} lg={7} xl={7}>
              {Number(workshopId) !== 2 && <WorkshopInputWoods now={date.toISOString()} />}

              <Divider sx={{ my: 3 }} />

              <WorkshopOutputWoods
                workshopOutData={workshopOutData}
                isWorkshopOutLoading={isWorkshopOutLoading}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={4.5} xl={4.5} flexShrink={1}>
              <Grid container flexDirection='column' width='100%'>
                <WorkshopDashboardCards now={date.toISOString()} />
                <WorkshopTrashStatsSunburst
                  workshopOutSunburstData={workshopOutSunburstData}
                  totalWorkshopOutVolume={totalWorkshopOutVolume}
                  isWorkshopOutLoading={isWorkshopOutLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CustomTabPanel>

      <CustomTabPanel tabPanelValue={currentTab.id} value={'few-days'}>
        <TimeRangeInputs range={timeRange} setRange={setTimeRange} />

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
