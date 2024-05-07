import { Box } from '@mui/material'

import { WoodAmountRangeItem } from '@/entities/wood'

export const WoodsRangeAmount = () => {
  return (
    <Box display='flex' gap={5}>
      <WoodAmountRangeItem />
      <WoodAmountRangeItem />
    </Box>
  )
}
