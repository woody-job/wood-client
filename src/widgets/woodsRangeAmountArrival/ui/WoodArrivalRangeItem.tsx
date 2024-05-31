import { FC } from 'react'

import { skipToken } from '@reduxjs/toolkit/query'

import { Box, Skeleton, Typography } from '@mui/material'

import { WoodAmountSunburst } from '@/entities/wood'
import { useFetchWoodArrivalByRangeQuery } from '@/entities/wood-arrival'

export interface WoodArrivalRangeItemProps {
  woodConditionId: number
  woodConditionName: string
  endDate: string
  startDate: string
}

export const WoodArrivalRangeItem: FC<WoodArrivalRangeItemProps> = ({
  woodConditionName,
  woodConditionId,
  endDate,
  startDate,
}) => {
  const { data: woodArrival, isLoading: isLoadingWoodArrival } = useFetchWoodArrivalByRangeQuery(
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
      <Typography variant='h6'>{woodConditionName}</Typography>

      {isLoadingWoodArrival && <Skeleton variant='circular' width='600px' height='600px' />}
      {woodArrival && (
        <WoodAmountSunburst data={woodArrival.sunburstData} total={woodArrival.totalVolume} />
      )}
    </Box>
  )
}
