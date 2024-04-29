import { WoodByDayItem } from '@/entities/wood'
import { Box, Button } from '@mui/material'

export const WoodsDayAmount = () => {
  return (
    <Box display='flex' gap={10} mt={5} flexWrap='wrap'>
      <WoodByDayItem action={<Button size='small'>Добавить</Button>} title='Сырая доска' />
      <WoodByDayItem action={<Button size='small'>Добавить</Button>} title='Сухая доска' />
    </Box>
  )
}
