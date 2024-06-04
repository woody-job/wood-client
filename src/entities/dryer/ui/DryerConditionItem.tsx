import { FC, ReactNode } from 'react'

import { Box, CircularProgress, Typography } from '@mui/material'

import { DryerConditionSunburst, DryerDataResponse } from '@/entities/dryer'
import { DashItem } from '@/shared/ui'

export interface DryerConditionItemProps {
  actions?: ReactNode
  dryerName: string
  dryerData: DryerDataResponse | undefined
  dryerIterationCount: number
  isLoadingDryerData: boolean
}

export const DryerConditionItem: FC<DryerConditionItemProps> = props => {
  const { actions, dryerName, dryerData, isLoadingDryerData, dryerIterationCount } = props

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
        alignItems='center'
        className='dryer-condition-item'
      >
        <Typography variant='h6'>{dryerName}</Typography>
        <Typography variant='subtitle1' sx={{ mb: 2 }}>
          Цикл {dryerIterationCount}
        </Typography>

        {isLoadingDryerData ? (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            minWidth='650px'
            minHeight='650px'
          >
            <CircularProgress size={100} />
          </Box>
        ) : dryerData ? (
          <DryerConditionSunburst dryerData={dryerData} />
        ) : (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            minWidth='650px'
            minHeight='650px'
          >
            <Typography variant='h6' fontWeight='regular'>
              Нет данных о сушилке
            </Typography>
          </Box>
        )}
      </DashItem>

      <Box width='100' display='flex' justifyContent='space-evenly' mt={1}>
        {actions}
      </Box>
    </Box>
  )
}
