import { FC } from 'react'

import { Typography } from '@mui/material'

import { CustomSunburst } from '@/shared/ui'

export interface DimensionProps {
  data: unknown
}

export const DimensionsSunburst: FC<DimensionProps> = ({ data }) => {
  return (
    <CustomSunburst
      data={data}
      id='name'
      value='size'
      containerProps={{
        width: '100%',
        height: '750px',
      }}
      arcLabel={({ formattedValue }) => `${formattedValue}`}
      valueFormat={value => value.toFixed(2) + ' м3'}
    >
      <Typography>Всего м3</Typography>
      <Typography>1225.34</Typography>
    </CustomSunburst>
  )
}
