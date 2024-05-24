import { FC } from 'react'

import { Typography } from '@mui/material'

import { DryerDataResponse } from '@/entities/dryer'
import { CustomSunburst } from '@/shared/ui'

export type DryerConditionSunburstProps = {
  dryerData: DryerDataResponse
}

export const DryerConditionSunburst: FC<DryerConditionSunburstProps> = ({ dryerData }) => {
  const data = {
    children: dryerData.data,
  }

  return (
    <CustomSunburst
      value='size'
      id='name'
      data={data}
      containerProps={{
        width: '650px',
        height: '650px',
      }}
      arcLabel={({ id }) => `${id}`}
      valueFormat={value => value.toFixed(2) + ' м3'}
    >
      <Typography textAlign='center'>Всего</Typography>
      <Typography textAlign='center'>{dryerData.total.toFixed(2) + ' м3'}</Typography>
    </CustomSunburst>
  )
}
