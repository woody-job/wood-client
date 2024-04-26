import { Box, Typography } from '@mui/material'
import { SortsDashItem } from '@/enitities/sort'

export const DryersDashboard = () => {
  const sorts = [
    { title: 'Первый сорт', value: 80.459 },
    { title: 'Второй сорт', value: 0 },
  ]

  return (
    <Box>
      <Typography variant='h5' mb={2}>
        Сушилки
      </Typography>
      <Box display='flex' gap={1}>
        <SortsDashItem sorts={sorts} name={'Камера 1'} />
        <SortsDashItem sorts={sorts} name={'Камера 1'} />
      </Box>
    </Box>
  )
}
