import { Box } from '@mui/material'
import { WoodClassDashItem } from '@/entities/wood-class'
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
        <WoodClassDashItem sorts={sorts} name={'Камера 1'} />
        <WoodClassDashItem sorts={sorts} name={'Камера 1'} />
      </Box>
    </Box>
  )
}
