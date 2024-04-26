import { WorkshopsDashboard } from '@/widgets/workshopsDashboard'
import { Box } from '@mui/material'
import { DryersDashboard } from '@/widgets/dryersDashboard'
import { InfoDashboard } from '@/widgets/infoDashboard'

export const Dashboard = () => {
  return (
    <Box>
      <WorkshopsDashboard />

      <Box display='flex' mt={5} gap={3} flexWrap='wrap'>
        <InfoDashboard />
        <DryersDashboard />
      </Box>
    </Box>
  )
}
