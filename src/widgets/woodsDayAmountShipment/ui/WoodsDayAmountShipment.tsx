import { FC } from 'react'

import { Grid } from '@mui/material'

import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'

import { WoodShipmentByDay } from './WoodShipmentByDay.tsx'

export type WoodsDayAmountShipmentProps = {
  selectedDate: string
}

export const WoodsDayAmountShipment: FC<WoodsDayAmountShipmentProps> = ({ selectedDate }) => {
  const { data: woodConditions } = useFetchAllWoodConditionsQuery()

  return (
    <Grid container mt={5} spacing={5}>
      {woodConditions &&
        woodConditions.map(woodCondition => (
          <Grid item xs={12} lg={6} xl={6}>
            <WoodShipmentByDay
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
