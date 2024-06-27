import { FC, ReactNode } from 'react'

import { skipToken } from '@reduxjs/toolkit/query'

import { Box, Grid, Typography } from '@mui/material'

import { useFetchDryerDataByIdQuery } from '@/entities/dryer'
import { DashItem, TableFullscreen } from '@/shared/ui'

import { DryerConditionTable } from './DryerConditionTable'

export interface DryerConditionItemProps {
  actions?: ReactNode
  dryerName: string
  dryerIterationCount: number
  dryerId: number
}

export const DryerConditionItem: FC<DryerConditionItemProps> = ({
  actions,
  dryerName,
  dryerIterationCount,
  dryerId,
}) => {
  const { data: dryerData, isLoading: isLoadingDryerData } = useFetchDryerDataByIdQuery(
    dryerId ?? skipToken
  )

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
