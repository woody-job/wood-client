import { NavLink } from 'react-router-dom'

import { Box, Button, Typography } from '@mui/material'

import { WorkshopWoodsBar } from '@/entities/workshop'
import { urls } from '@/shared/constants'
import { DashItem } from '@/shared/ui'

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
      width='500px'
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

        <Button component={NavLink} to={`/${urls.workshop}/1`} replace size='small'>
          Подробнее
        </Button>
      </Box>
    </DashItem>
  )
}
