import { FC } from 'react'

import { skipToken } from '@reduxjs/toolkit/query'

import { Box, Skeleton, Typography } from '@mui/material'

import { WoodAmountSunburst } from '@/entities/wood'
import { useFetchWoodShipmentQuery } from '@/entities/wood-shipment'
import { TimeRangeState } from '@/shared/ui/time-range'

export interface WoodShipmentRangeItemProps extends TimeRangeState {
  title?: string
  woodConditionId: number
}

export const WoodShipmentRangeItem: FC<WoodShipmentRangeItemProps> = ({
  title,
  woodConditionId,
  endDate,
  startDate,
}) => {
  const { data: woodShipment, isLoading: isLoadingWoodShipment } = useFetchWoodShipmentQuery(
    startDate && endDate
      ? {
          woodConditionId,
          endDate,
          startDate,
        }
      : skipToken
  )

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h6'>{title}</Typography>

      {isLoadingWoodShipment && <Skeleton variant='circular' width='600px' height='600px' />}
      {woodShipment && (
        <WoodAmountSunburst data={woodShipment.sunburstData} total={woodShipment.totalVolume} />
      )}
    </Box>
  )
}
