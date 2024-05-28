import { FC } from 'react'

import { Box } from '@mui/material'

import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'
import { TimeRangeState } from '@/shared/ui/time-range'

import { WoodArrivalRangeItem } from './WoodArrivalRangeItem.tsx'

export type WoodsRangeAmountProps = TimeRangeState

export const WoodsRangeAmountArrival: FC<WoodsRangeAmountProps> = props => {
  const { endDate, startDate } = props
  const { data: woodConditions } = useFetchAllWoodConditionsQuery()

  return (
    <Box display='flex' gap={5}>
      {woodConditions &&
        woodConditions.map(woodCondition => (
          <WoodArrivalRangeItem
            key={woodCondition.id}
            woodConditionId={woodCondition.id}
            endDate={endDate}
            startDate={startDate}
          />
        ))}
    </Box>
  )
}
