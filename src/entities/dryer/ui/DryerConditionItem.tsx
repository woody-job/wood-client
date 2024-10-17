import { FC } from 'react'

import { skipToken } from '@reduxjs/toolkit/query'

import { Box, Grid, Typography } from '@mui/material'

import { DryerActionsProps, useFetchDryerDataByIdQuery } from '@/entities/dryer'
import { DashItem, TableFullscreen } from '@/shared/ui'

import { DryerConditionTable } from './DryerConditionTable'

export interface DryerConditionItemProps {
  actions?: (props: DryerActionsProps) => JSX.Element
  dryerName: string
  dryerId: number
}

export const DryerConditionItem: FC<DryerConditionItemProps> = ({
  actions,
  dryerName,
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
            {dryerName}
          </Typography>

          <Box width='100' display='flex' gap={2} my={1}>
            {actions?.({ dryerData: dryerData?.data })}
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
