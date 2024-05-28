import { FC } from 'react'

import { Typography } from '@mui/material'

import { CustomSunburst } from '@/shared/ui'

export type WoodAmountSunburstChild = {
  name: string
  size: number
}

export type WoodAmountSunburstProps = {
  data: {
    name: string
    children?: WoodAmountSunburstChild[]
  }[]
  total: number
}

export const WoodAmountSunburst: FC<WoodAmountSunburstProps> = props => {
  const { data, total } = props

  return (
    <CustomSunburst
      data={{ children: data }}
      id='name'
      value='size'
      arcLabel={({ id }) => `${id}`}
      containerProps={{
        width: '600px',
        height: '600px',
      }}
    >
      <Typography variant='h6' textAlign='center'>
        Всего м3:
      </Typography>
      <Typography variant='h6' textAlign='center'>
        {total}
      </Typography>
    </CustomSunburst>
  )
}
