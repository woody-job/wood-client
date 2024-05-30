import { FC } from 'react'

import { Box, Typography } from '@mui/material'

import { CustomSunburst } from '@/shared/ui'

export type VaultSunburstItem = { name: string; children: { name: string; size: number }[] }

export interface VaultItemProps {
  title?: string
  sunburstData: VaultSunburstItem[]
}

export const VaultItem: FC<VaultItemProps> = ({ title, sunburstData }) => {
  const data = {
    name: 'root',
    children: sunburstData,
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Typography sx={{ mb: 3 }}>{title}</Typography>

      <CustomSunburst
        data={data}
        id='name'
        value='size'
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
