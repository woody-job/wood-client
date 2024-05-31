import { FC } from 'react'

import { skipToken } from '@reduxjs/toolkit/query'

import { Box, Skeleton, Typography } from '@mui/material'

import { WoodAmountSunburst } from '@/entities/wood'
import { useFetchWoodShipmentByRangeQuery } from '@/entities/wood-shipment'

export interface WoodShipmentRangeItemProps {
  woodConditionName: string
  startDate: string
  endDate: string
  woodConditionId: number
}

export const WoodShipmentRangeItem: FC<WoodShipmentRangeItemProps> = ({
  woodConditionName,
  woodConditionId,
  endDate,
  startDate,
}) => {
  const { data: woodShipment, isLoading: isLoadingWoodShipment } = useFetchWoodShipmentByRangeQuery(
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

      {isLoadingWoodShipment && <Skeleton variant='circular' width='600px' height='600px' />}
      {woodShipment && (
        <WoodAmountSunburst data={woodShipment.sunburstData} total={woodShipment.totalVolume} />
      )}
    </Box>
  )
}
