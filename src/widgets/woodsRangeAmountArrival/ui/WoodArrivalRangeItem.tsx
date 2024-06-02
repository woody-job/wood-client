import { FC } from 'react'

import { skipToken } from '@reduxjs/toolkit/query'

import { Box, Grid, Skeleton, Typography } from '@mui/material'

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
    <Grid container flexDirection='column' alignItems='center'>
      <Typography variant='h6'>{woodConditionName}</Typography>

      {isLoadingWoodArrival && (
        <Grid item lg={6} xl={6}>
          <Skeleton variant='circular' width='500px' height='500px' />
        </Grid>
      )}
      {woodArrival && (
        <WoodAmountSunburst data={woodArrival.sunburstData} total={woodArrival.totalVolume} />
      )}
    </Grid>
  )
}
