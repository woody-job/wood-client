import { useState } from 'react'

import { Box, Typography } from '@mui/material'

import { WetWoodVaultStats } from '@/widgets/wetWoodVaultStats'
import { TimeRangeInputs } from '@/shared/ui/time-range'

import dayjs from 'dayjs'

export const WetWoodVault = () => {
  const [timeRange, setTimeRange] = useState({
    startDate: dayjs().subtract(2, 'day'),
    endDate: dayjs().subtract(1, 'day'),
  })

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 5 }}>
        Свод сырой доски
      </Typography>

      <TimeRangeInputs range={timeRange} setRange={setTimeRange} />

      <WetWoodVaultStats
        endDate={timeRange.endDate.toISOString()}
        startDate={timeRange.startDate.toISOString()}
      />
    </Box>
  )
}
