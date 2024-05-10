import { FC } from 'react'

import { Box, Typography } from '@mui/material'

import { CustomSunburst } from '@/shared/ui'

export interface VaultItemProps {
  title?: string
}

export const VaultItem: FC<VaultItemProps> = ({ title }) => {
  const data = {
    name: 'root',
    children: [
      {
        name: '1 сорт',
        children: [
          {
            name: '100x110x10',
            value: 0.5,
          },
          {
            name: '100x120x10',
            value: 0.6,
          },
          {
            name: '100x130x10',
            value: 0.7,
          },
        ],
      },
      {
        name: '2 сорт',
        children: [
          {
            name: '100x110x10',
            value: 0.3,
          },
          {
            name: '100x120x10',
            value: 0.4,
          },
          {
            name: '100x130x10',
            value: 0.5,
          },
        ],
      },
    ],
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Typography sx={{ mb: 3 }}>{title}</Typography>

      <CustomSunburst
        data={data}
        id='name'
        value='value'
        containerProps={{
          width: '650px',
          height: '650px',
        }}
        arcLabel={({ id }) => `${id}`}
        valueFormat={value => value.toFixed(2) + ' м3'}
      >
        <Typography variant='subtitle1'>Всего м3</Typography>
        <Typography variant='subtitle1'>80.0448</Typography>
      </CustomSunburst>
    </Box>
  )
}
