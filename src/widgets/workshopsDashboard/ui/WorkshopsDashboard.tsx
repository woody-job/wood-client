import { WorkshopDashItem } from '@/enitities/workshop/ui'
import { Box } from '@mui/material'

export const WorkshopsDashboard = () => {
  return (
    <Box display='flex' gap={3} flexWrap='wrap'>
      <WorkshopDashItem />
      <WorkshopDashItem />
      <WorkshopDashItem />
    </Box>
  )
}
