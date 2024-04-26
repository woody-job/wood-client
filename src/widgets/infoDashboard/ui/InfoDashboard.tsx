import { Box } from '@mui/material'
import { SortsDashItem } from '@/enitities/sort'
import { DashboardTitle } from '@/shared/ui'

export const InfoDashboard = () => {
  const sorts = [
    { title: 'Первый сорт', value: 80.459 },
    { title: 'Второй сорт', value: 0 },
  ]

  return (
    <Box>
      <DashboardTitle>Общие данные по складу</DashboardTitle>
      <Box display='flex' gap={1} flexWrap='wrap'>
        <SortsDashItem sorts={sorts} name='Сырая доска:' />
        <SortsDashItem sorts={sorts} name='Сухая доска:' />
      </Box>
    </Box>
  )
}
