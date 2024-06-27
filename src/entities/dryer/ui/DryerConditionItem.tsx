import { FC, ReactNode } from 'react'

import { Box, Grid, Typography } from '@mui/material'

import { DryerDataResponse } from '@/entities/dryer'
import { DashItem, TableFullscreen } from '@/shared/ui'

import { DryerConditionTable } from './DryerConditionTable'

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
        sx={{
          background: theme => theme.primary.purpleOpacity,
          mb: 2,
        }}
      >
        <Grid container justifyContent='space-between' alignItems='flex-end'>
          <Typography sx={{ mb: 1 }} variant='subtitle1'>
            {dryerName} |{' '}
            <Typography fontWeight='bold' display='inline-block'>
              цикл {dryerIterationCount}
            </Typography>
          </Typography>

          <Box width='100' display='flex' gap={2} my={1}>
            {actions}
          </Box>
        </Grid>

        <TableFullscreen
          renderTable={props => (
            <DryerConditionTable
              dryerData={dryerData}
              isLoadingDryerData={isLoadingDryerData}
              {...props}
            />
          )}
        />
      </DashItem>
    </Box>
  )
}
