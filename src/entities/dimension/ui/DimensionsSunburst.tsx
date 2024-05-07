import { CustomSunburst } from '@/shared/ui'
import { Typography } from '@mui/material'
import { FC } from 'react'

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
        width: '600px',
        height: '600px',
      }}
    >
      <Typography>Всего м3</Typography>
      <Typography>1225.34</Typography>
    </CustomSunburst>
  )
}
