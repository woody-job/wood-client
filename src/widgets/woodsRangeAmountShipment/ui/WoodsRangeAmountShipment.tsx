import { FC } from 'react'

import { Box } from '@mui/material'

import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'

import { WoodShipmentRangeItem } from './WoodShipmentRangeItem.tsx'

export type WoodsRangeAmountProps = {
  endDate: string
  startDate: string
}

export const WoodsRangeAmountShipment: FC<WoodsRangeAmountProps> = props => {
  const { endDate, startDate } = props
  const { data: woodConditions } = useFetchAllWoodConditionsQuery()

  return (
    <Box display='flex' gap={5}>
      {woodConditions &&
        woodConditions.map(woodCondition => (
          <WoodShipmentRangeItem
            key={woodCondition.id}
            woodConditionName={woodCondition.name}
            woodConditionId={woodCondition.id}
            endDate={endDate}
            startDate={startDate}
          />
        ))}
    </Box>
  )
}
