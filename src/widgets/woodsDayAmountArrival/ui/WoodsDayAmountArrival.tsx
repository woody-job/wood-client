import { FC } from 'react'

import { Grid } from '@mui/material'

import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'

import { WoodArrivalByDay } from './WoodArrivalByDay.tsx'

export type WoodsDayAmountArrivalProps = {
  selectedDate: string
}

export const WoodsDayAmountArrival: FC<WoodsDayAmountArrivalProps> = ({ selectedDate }) => {
  const { data: woodConditions } = useFetchAllWoodConditionsQuery()

  return (
    <Grid container mt={5} spacing={5}>
      {woodConditions &&
        woodConditions.map(woodCondition => (
          <Grid item xs={12} lg={6} xl={6}>
            <WoodArrivalByDay
              key={woodCondition.id}
              woodConditionId={woodCondition.id}
              selectedDate={selectedDate}
              title={woodCondition.name}
            />
          </Grid>
        ))}
    </Grid>
  )
}
