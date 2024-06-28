import { FC } from 'react'

import { useParams } from 'react-router-dom'

import { Box, Divider, Grid } from '@mui/material'

import { WorkshopDashboardCards } from '@/widgets/workshopDashboardCards'
import { WorkshopInputWoods } from '@/widgets/workshopInputWoods'
import { WorkshopOutputWoods } from '@/widgets/workshopOutputWoods'
import { useFetchWorkshopOutForDateQuery } from '@/entities/workshop-out'
import { useDateInSearchParams } from '@/shared/libs/hooks/search-params-with-state'
import { CustomTabPanel, DatePicker } from '@/shared/ui'

import { Dayjs } from 'dayjs'

export const WorkshopDayInfo: FC = () => {
  const { workshopId } = useParams()

  const { date, handleSetDate } = useDateInSearchParams()

  const { data: workshopOut, isLoading: isWorkshopOutLoading } = useFetchWorkshopOutForDateQuery(
    { workshopId: workshopId ? Number(workshopId) : -1, date: date.toISOString() },
    { skip: !workshopId, refetchOnMountOrArgChange: true }
  )

  const workshopOutData = workshopOut ? workshopOut.data : []
  const totalWorkshopOutVolume = workshopOut?.totalWorkshopOutVolume
    ? workshopOut.totalWorkshopOutVolume
    : 0

  const handleAccept = (value: Dayjs | null) => {
    if (value) {
      handleSetDate(value)
    }
  }

  return (
    <CustomTabPanel tabPanelValue={'day'} value={'day'}>
      <Box>
        <Box sx={{ mb: 2, mt: 1 }} width={200}>
          <DatePicker value={date} onAccept={handleAccept} />
        </Box>

        <Grid container gap={3}>
          <Grid item xs={12} md={12} lg={7} xl={7}>
            {Number(workshopId) !== 2 && <WorkshopInputWoods now={date.toISOString()} />}

            <Divider sx={{ my: 3 }} />

            <WorkshopOutputWoods
              now={date.toISOString()}
              workshopOutData={workshopOutData}
              isWorkshopOutLoading={isWorkshopOutLoading}
              totalWorkshopOutVolume={totalWorkshopOutVolume}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4.5} xl={4.5} flexShrink={1}>
            <Grid container flexDirection='column' width='100%'>
              <WorkshopDashboardCards now={date.toISOString()} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </CustomTabPanel>
  )
}
