import { Box } from '@mui/material'

import { AddWoodsArrivalShipment, WoodByDayItem } from '@/entities/wood'

export const WoodsDayAmountShipment = () => {
  return (
    <Box display='flex' gap={10} mt={5} flexWrap='wrap'>
      <WoodByDayItem
        addComponent={
          <AddWoodsArrivalShipment title='Добавить доски на отгрузку' onSubmit={() => {}} />
        }
        title='Сырая доска'
      />
      <WoodByDayItem
        addComponent={
          <AddWoodsArrivalShipment title='Добавить доски на отгрузку' onSubmit={() => {}} />
        }
        title='Сырая доска'
      />
    </Box>
  )
}
