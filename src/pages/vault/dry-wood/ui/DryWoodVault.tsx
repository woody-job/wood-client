import { Box, Typography } from '@mui/material'

import { DryWoodVaultStats } from '@/widgets/dryWoodVaultStats'
import { useTimeRangeInSearchParams } from '@/shared/libs/hooks'
import { TimeRangeInputs } from '@/shared/ui/time-range'

export const DryWoodVault = () => {
  const { timeRange, handleSetTimeRange } = useTimeRangeInSearchParams()

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 5 }}>
        Свод сухой доски
      </Typography>

      <TimeRangeInputs range={timeRange} setRange={handleSetTimeRange} />

      <DryWoodVaultStats
        endDate={timeRange.endDate.format('YYYY-MM-DD')}
        startDate={timeRange.startDate.format('YYYY-MM-DD')}
      />
    </Box>
  )
}
