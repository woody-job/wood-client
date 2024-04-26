import { Box } from '@mui/material'
import { SortsDashItem } from '@/enitities/sort'
import { DashboardTitle } from '@/shared/ui'

export const DryersDashboard = () => {
  const sorts = [
    { title: 'Первый сорт', value: 80.459 },
    { title: 'Второй сорт', value: 0 },
  ]

  return (
    <Box>
      <DashboardTitle>Сушилки</DashboardTitle>
      <Box display='flex' gap={1} flexWrap='wrap'>
        <SortsDashItem sorts={sorts} name={'Камера 1'} />
        <SortsDashItem sorts={sorts} name={'Камера 1'} />
      </Box>
    </Box>
  )
}
