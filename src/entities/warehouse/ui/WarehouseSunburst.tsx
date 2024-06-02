import { FC } from 'react'

import { Skeleton, Typography } from '@mui/material'

import { WarehouseSunburstData } from '@/entities/warehouse'
import { CustomSunburst } from '@/shared/ui'

export interface DimensionProps {
  data: WarehouseSunburstData[]
  total: number
}

export const WarehouseSunburst: FC<DimensionProps> = ({ data, total }) => {
  return (
    <CustomSunburst
      data={{ children: data }}
      id='name'
      value='size'
      containerProps={{
        width: '800px',
        height: '100%',
      }}
      arcLabel={({ id }) => `${id}`}
      valueFormat={value => value.toFixed(2) + ' м3'}
      arcLabelsSkipAngle={6}
    >
      <Typography textAlign='center'>Всего м3</Typography>
      <Typography textAlign='center'>{total}</Typography>
    </CustomSunburst>
  )
}
