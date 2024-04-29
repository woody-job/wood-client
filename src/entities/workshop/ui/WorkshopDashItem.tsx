import { DashItem } from '@/shared/ui'
import { Box, Button, Typography } from '@mui/material'
import { WorkshopWoodsBar } from '@/entities/workshop'

export const WorkshopDashItem = () => {
  const stats = [
    { title: 'Вход', value: '68.08 м3' },
    { title: 'Итого на куб', value: '2997' },
  ]

  return (
    <DashItem
      display='flex'
      justifyContent='center'
      alignItems='start'
      flexDirection='column'
      flex='45% 0 0'
      gap={1}
      sx={{
        background: theme => theme.primary.purpleOpacity,
      }}
    >
      <Typography>Цех 1</Typography>

      <WorkshopWoodsBar />

      <Box display='flex' justifyContent='space-between' alignItems='end' width='100%'>
        <Box display='flex' flexDirection='column'>
          <Typography variant='subtitle1' color={theme => theme.black['80']}>
            Сегодня:
          </Typography>
          {stats.map(({ title, value }) => (
            <Typography variant='subtitle2' color={theme => theme.black['80']}>
              <strong>{title}:</strong> {value}
            </Typography>
          ))}
        </Box>

        <Button size='small'>Подробнее</Button>
      </Box>
    </DashItem>
  )
}
