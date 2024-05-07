import { Box, Typography } from '@mui/material'

import { DryWoodVaultStats } from '@/widgets/dryWoodVaultStats'
import { TimeRangeInputs } from '@/shared/ui/time-range'

export const DryWoodVault = () => {
  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 5 }}>
        Свод сухой доски
      </Typography>

      <TimeRangeInputs />

      <DryWoodVaultStats />
    </Box>
  )
}
