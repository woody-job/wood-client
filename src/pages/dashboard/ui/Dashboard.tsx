import { Box, Typography } from '@mui/material'

import { DryersDashboard } from '@/widgets/dryersDashboard'
import { InfoDashboard } from '@/widgets/infoDashboard'
import { WorkshopsDashboard } from '@/widgets/workshopsDashboard'

export const Dashboard = () => {
  return (
    <Box>
      <Typography component='h1' variant='h5' mb={3}>
        Общая информация
      </Typography>

      <Box display='grid' mb={5} gridTemplateColumns='repeat(2, 1fr)'>
        <InfoDashboard />
        <DryersDashboard />
      </Box>
      <WorkshopsDashboard />
    </Box>
  )
}
