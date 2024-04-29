import { WoodAmountSunburst } from '@/entities/wood'
import { Box, Typography } from '@mui/material'
import { FC } from 'react'

export interface WoodAmountRangeItemProps {
  title?: string
}

export const WoodAmountRangeItem: FC<WoodAmountRangeItemProps> = ({ title }) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h6'>{title}</Typography>

      <WoodAmountSunburst />
    </Box>
  )
}
