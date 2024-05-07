import { Box } from '@mui/material'

import { WorkshopDashItem } from '@/entities/workshop/ui'
import { DashboardTitle } from '@/shared/ui'

export const WorkshopsDashboard = () => {
  return (
    <Box>
      <DashboardTitle>Цеха сейчас</DashboardTitle>
      <Box display='flex' gap={2} flexWrap='wrap' justifyContent='center'>
        {/* Либо скролл, либо flex-wrap: wrap */}
        <WorkshopDashItem />
        <WorkshopDashItem />
        <WorkshopDashItem />
      </Box>
    </Box>
  )
}
