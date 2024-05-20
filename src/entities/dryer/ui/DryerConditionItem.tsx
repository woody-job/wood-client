import { FC, ReactNode } from 'react'

import { Box, Typography } from '@mui/material'

import { DryerConditionSunburst } from '@/entities/dryer'
import { DashItem } from '@/shared/ui'

export interface DryerConditionItemProps {
  actions?: ReactNode
  dryerName: string
}

export const DryerConditionItem: FC<DryerConditionItemProps> = ({ actions, dryerName }) => {
  return (
    <Box
      sx={{
        '&:nth-child(2n) .dryer-condition-item': {
          backgroundColor: theme => theme.primary.purpleOpacity,
        },
        '&:nth-child(2n+1) .dryer-condition-item': {
          backgroundColor: theme => theme.primary.blue,
        },
      }}
    >
      <DashItem
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        className='dryer-condition-item'
      >
        <Typography variant='h6'>{dryerName}</Typography>
        <Typography variant='subtitle1'>Цикл 501</Typography>

        <DryerConditionSunburst />
      </DashItem>

      <Box width='100' display='flex' justifyContent='space-evenly' mt={1}>
        {actions}
      </Box>
    </Box>
  )
}
