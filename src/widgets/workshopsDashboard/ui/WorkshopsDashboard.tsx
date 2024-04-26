import { WorkshopDashItem } from '@/enitities/workshop/ui'
import { Box, Typography } from '@mui/material'

export const WorkshopsDashboard = () => {
  return (
    <Box>
      <Typography variant='h5'>Цеха сейчас</Typography>
      <Box display='flex' gap={3} sx={{ overflowX: 'scroll' }} py={2}>
        {/* Либо скролл, либо flex-wrap: wrap */}
        <WorkshopDashItem />
        <WorkshopDashItem />
        <WorkshopDashItem />
      </Box>
    </Box>
  )
}
