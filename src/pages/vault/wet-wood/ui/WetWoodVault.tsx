import { Box, Typography } from '@mui/material'

import { WetWoodVaultStats } from '@/widgets/wetWoodVaultStats'
import { TimeRangeInputs } from '@/shared/ui/time-range'

import { useTimeRangeInSearchParams } from '@/shared/libs/hooks'

export const WetWoodVault = () => {
  const { timeRange, handleSetTimeRange } = useTimeRangeInSearchParams()

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 5 }}>
        Свод сырой доски
      </Typography>

      <TimeRangeInputs range={timeRange} setRange={handleSetTimeRange} />

      <WetWoodVaultStats
        endDate={timeRange.endDate.format('YYYY-MM-DD')}
        startDate={timeRange.startDate.format('YYYY-MM-DD')}
      />
    </Box>
  )
}
