import { FC } from 'react'

import { Box } from '@mui/material'

import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'

import { WoodShipmentByDay } from './WoodShipmentByDay.tsx'

export type WoodsDayAmountShipmentProps = {
  selectedDate: string
}

export const WoodsDayAmountShipment: FC<WoodsDayAmountShipmentProps> = ({ selectedDate }) => {
  const { data: woodConditions } = useFetchAllWoodConditionsQuery()

  return (
    <Box display='flex' gap={10} mt={5} flexWrap='wrap'>
      {woodConditions &&
        woodConditions.map(woodCondition => (
          <WoodShipmentByDay
            key={woodCondition.id}
            woodConditionId={woodCondition.id}
            selectedDate={selectedDate}
            title={woodCondition.name}
          />
        ))}
    </Box>
  )
}
