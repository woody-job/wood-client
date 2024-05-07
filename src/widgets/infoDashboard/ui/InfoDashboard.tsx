import { Box } from '@mui/material'

import { WoodClassDashItem } from '@/entities/wood-class'
import { DashboardTitle } from '@/shared/ui'

export const InfoDashboard = () => {
  const sorts = [
    { title: 'Первый сорт', value: 80.459 },
    { title: 'Второй сорт', value: 0 },
  ]

  return (
    <Box>
      <DashboardTitle>Общие данные по складу</DashboardTitle>
      <Box display='flex' gap={2} flexWrap='wrap'>
        <WoodClassDashItem sorts={sorts} name='Сырая доска:' />
        <WoodClassDashItem sorts={sorts} name='Сухая доска:' />
      </Box>
    </Box>
  )
}
