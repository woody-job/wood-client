import { AddWoodsArrivalShipment, WoodByDayItem } from '@/entities/wood'
import { Box } from '@mui/material'

export const WoodsDayAmountShipment = () => {
  return (
    <Box display='flex' gap={10} mt={5} flexWrap='wrap'>
      <WoodByDayItem
        action={<AddWoodsArrivalShipment title='Добавить доски на отгрузку' onSubmit={() => {}} />}
        title='Сырая доска'
      />
      <WoodByDayItem
        action={<AddWoodsArrivalShipment title='Добавить доски на отгрузку' onSubmit={() => {}} />}
        title='Сырая доска'
      />
    </Box>
  )
}
