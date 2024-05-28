import { FC } from 'react'

import { skipToken } from '@reduxjs/toolkit/query'

import { Box, Skeleton, Typography } from '@mui/material'

import { WoodAmountSunburst } from '@/entities/wood'
import { useFetchWoodArrivalQuery } from '@/entities/wood-arrival'
import { TimeRangeState } from '@/shared/ui/time-range'

export interface WoodArrivalRangeItemProps extends TimeRangeState {
  title?: string
  woodConditionId: number
}

export const WoodArrivalRangeItem: FC<WoodArrivalRangeItemProps> = ({
  title,
  woodConditionId,
  endDate,
  startDate,
}) => {
  const { data: woodArrival, isLoading: isLoadingWoodArrival } = useFetchWoodArrivalQuery(
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

      {isLoadingWoodArrival && <Skeleton variant='circular' width='600px' height='600px' />}
      {woodArrival && (
        <WoodAmountSunburst data={woodArrival.sunburstData} total={woodArrival.totalVolume} />
      )}
    </Box>
  )
}
