import { AddWoodsArrivalShipment, WoodByDayItem } from '@/entities/wood'
import { Box } from '@mui/material'

export const WoodsDayAmountArrival = () => {
  return (
    <Box display='flex' gap={10} mt={5} flexWrap='wrap'>
      <WoodByDayItem
        action={
          <AddWoodsArrivalShipment title='Добавить доски на поступление' onSubmit={() => {}} />
        }
        title='Сырая доска'
      />
      <WoodByDayItem
        action={
          <AddWoodsArrivalShipment title='Добавить доски на поступление' onSubmit={() => {}} />
        }
        title='Сырая доска'
      />
    </Box>
  )
}
