import { WorkshopsDashboard } from '@/widgets/workshopsDashboard'
import { Box, Typography } from '@mui/material'
import { DryersDashboard } from '@/widgets/dryersDashboard'
import { InfoDashboard } from '@/widgets/infoDashboard'

export const Dashboard = () => {
  return (
    <Box>
      <Typography component='h1' variant='h5' mb={3}>
        Общая информация
      </Typography>
      <WorkshopsDashboard />

      <Box display='flex' mt={5} gap={3} flexWrap='wrap'>
        <InfoDashboard />
        <DryersDashboard />
      </Box>
    </Box>
  )
}
