import { FC } from 'react'

import { Box, Skeleton, Typography } from '@mui/material'

import { CustomSunburst } from '@/shared/ui'

export type WoodAmountDaySunburstItem = {
  name: string
  size: number
}

export type WoodAmountByDaySunburstProps = {
  isLoading: boolean
  data: WoodAmountDaySunburstItem[]
  total: number
}

export const WoodAmountByDaySunburst: FC<WoodAmountByDaySunburstProps> = ({
  isLoading,
  data,
  total,
}) => {
  return (
    <Box display='flex' justifyContent='center' width='100%' px={5} mt={2}>
      {isLoading && <Skeleton variant='circular' width='500px' height='500px' />}
      <CustomSunburst
        data={{ children: data }}
        id='name'
        value='size'
        arcLabel={({ id }) => `${id}`}
        valueFormat={value => value.toFixed(2) + ' м3'}
        containerProps={{
          width: '100%',
          height: '500px',
        }}
      >
        <Typography variant='h6' textAlign='center'>
          Всего из:
        </Typography>
        <Typography variant='h6' textAlign='center'>
          {total} м3
        </Typography>
      </CustomSunburst>
    </Box>
  )
}
