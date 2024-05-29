import { FC } from 'react'

import { Box } from '@mui/material'

import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'

import { WoodArrivalByDay } from './WoodArrivalByDay.tsx'

export type WoodsDayAmountArrivalProps = {
  selectedDate: string
}

export const WoodsDayAmountArrival: FC<WoodsDayAmountArrivalProps> = ({ selectedDate }) => {
  const { data: woodConditions } = useFetchAllWoodConditionsQuery()

  return (
    <Box display='flex' gap={10} mt={5} flexWrap='wrap'>
      {woodConditions &&
        woodConditions.map(woodCondition => (
          <WoodArrivalByDay
            key={woodCondition.id}
            woodConditionId={woodCondition.id}
            selectedDate={selectedDate}
            title={woodCondition.name}
          />
        ))}
    </Box>
  )
}
