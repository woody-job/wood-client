import { FC } from 'react'

import { Box } from '@mui/material'

import { WorkshopTotalTable } from '@/entities/workshop'
import { useTimeRangeInSearchParams } from '@/shared/libs/hooks/search-params-with-state'
import { CustomTabPanel, TableFullscreen } from '@/shared/ui'
import { TimeRangeInputs } from '@/shared/ui/time-range'

export const WorkshopTimeRangeInfo: FC = () => {
  const { timeRange, handleSetTimeRange } = useTimeRangeInSearchParams()

  return (
    <CustomTabPanel tabPanelValue={'time-range'} value={'time-range'}>
      <TimeRangeInputs range={timeRange} setRange={handleSetTimeRange} />

      <Box mt={3}>
        <TableFullscreen
          renderTable={props => (
            <WorkshopTotalTable timeRange={timeRange} initialHeight={'70vh'} {...props} />
          )}
        />
      </Box>
    </CustomTabPanel>
  )
}
