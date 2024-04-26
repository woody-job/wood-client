import { WorkshopDashItem } from '@/enitities/workshop/ui'
import { Box } from '@mui/material'
import { DashboardTitle } from '@/shared/ui'

export const WorkshopsDashboard = () => {
  return (
    <Box>
      <DashboardTitle>Цеха сейчас</DashboardTitle>
      <Box display='flex' gap={3} sx={{ overflowX: 'scroll' }} pb={2}>
        {/* Либо скролл, либо flex-wrap: wrap */}
        <WorkshopDashItem />
        <WorkshopDashItem />
        <WorkshopDashItem />
      </Box>
    </Box>
  )
}
