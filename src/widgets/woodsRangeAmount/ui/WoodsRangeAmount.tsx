import { WoodAmountRangeItem } from '@/entities/wood'
import { Box } from '@mui/material'

export const WoodsRangeAmount = () => {
  return (
    <Box display='flex' justifyContent='space-between'>
      <WoodAmountRangeItem />
      <WoodAmountRangeItem />
    </Box>
  )
}
