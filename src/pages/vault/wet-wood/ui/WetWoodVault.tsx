import { TimeRangeInputs } from '@/shared/ui/time-range'
import { WetWoodVaultStats } from '@/widgets/wetWoodVaultStats'
import { Box, Typography } from '@mui/material'

export const WetWoodVault = () => {
  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 5 }}>
        Свод сухой доски
      </Typography>

      <TimeRangeInputs />

      <WetWoodVaultStats />
    </Box>
  )
}
