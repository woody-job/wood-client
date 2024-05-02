import { Box, Typography } from '@mui/material'
import { DashItem } from '@/shared/ui'

export const WorkshopDashboardCards = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={3}
      sx={{
        '& div:nth-child(2n)': {
          backgroundColor: theme => theme.primary.purple,
        },
        '& div:nth-child(2n+1)': {
          backgroundColor: theme => theme.primary.blue,
        },
      }}
    >
      <DashItem>
        <Typography>Выручка: 613402.02р</Typography>
        <Typography>Сырье: 613402.02р</Typography>
        <Typography>Распиловка: 613402.02р</Typography>
        <Typography variant='h6' sx={{ mt: 3 }}>
          Итог: 613402.02р
        </Typography>
      </DashItem>

      <DashItem>
        <Typography variant='h6'>Итог на куб:</Typography>
        <Typography variant='subtitle1'>613402.02р</Typography>
      </DashItem>

      <DashItem>
        <Typography variant='h6'>Сечение дня: 200x47x6</Typography>
        <Typography>613402.02р</Typography>
      </DashItem>
    </Box>
  )
}
