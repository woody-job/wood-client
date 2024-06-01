import { WorkshopTotalTable } from '@/entities/workshop'
import { useTimeRangeInSearchParams } from '@/shared/libs/hooks/search-params-with-state'
import { CustomTabPanel } from '@/shared/ui'
import { TimeRangeInputs } from '@/shared/ui/time-range'
import { WorkshopCharts } from '@/widgets/workshopCharts'
import { Box } from '@mui/material'
import { FC } from 'react'

export const WorkshopTimeRangeInfo: FC = () => {
  const { timeRange, handleSetTimeRange } = useTimeRangeInSearchParams()

  return (
    <CustomTabPanel tabPanelValue={'time-range'} value={'time-range'}>
      <TimeRangeInputs range={timeRange} setRange={handleSetTimeRange} />

      <Box mt={3}>
        <WorkshopCharts timeRange={timeRange} />
      </Box>

      <Box mt={3}>
        <WorkshopTotalTable timeRange={timeRange} />
      </Box>
    </CustomTabPanel>
  )
}
