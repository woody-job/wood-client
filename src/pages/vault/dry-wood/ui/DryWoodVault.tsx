import { useState } from 'react'

import { Box, Typography } from '@mui/material'

import { DryWoodVaultStats } from '@/widgets/dryWoodVaultStats'
import { TimeRangeInputs } from '@/shared/ui/time-range'

import dayjs from 'dayjs'

export const DryWoodVault = () => {
  const [timeRange, setTimeRange] = useState({
    startDate: dayjs().subtract(2, 'day'),
    endDate: dayjs().subtract(1, 'day'),
  })

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 5 }}>
        Свод сухой доски
      </Typography>

      <TimeRangeInputs range={timeRange} setRange={setTimeRange} />

      <DryWoodVaultStats endDate={timeRange.endDate.format('YYYY-MM-DD')}
                         startDate={timeRange.startDate.format('YYYY-MM-DD')} />
    </Box>
  )
}
