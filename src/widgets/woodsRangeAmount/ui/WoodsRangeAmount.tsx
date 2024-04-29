import { WoodAmountRangeItem } from '@/entities/wood'
import { Box } from '@mui/material'

export const WoodsRangeAmount = () => {
  return (
    <Box display='flex' gap={5}>
      <WoodAmountRangeItem />
      <WoodAmountRangeItem />
    </Box>
  )
}
