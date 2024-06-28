import { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { Box, Button, Typography } from '@mui/material'

import { urls } from '@/shared/constants'
import { DashItem, TableFullscreen } from '@/shared/ui'

import { WorkshopTotalTable } from './WorkshopTotalTable'
import dayjs from 'dayjs'

type WorkshopDashItemProps = {
  workshopName: string
  workshopId: number
}

export const WorkshopDashItem: FC<WorkshopDashItemProps> = ({ workshopName, workshopId }) => {
  const today = dayjs()

  // В таблице отображается текущая рабочая неделя
  const weekStart = today.clone().startOf('week').add(1, 'days')
  const weekEnd = weekStart.add(5, 'days')

  return (
    <DashItem
      sx={{
        background: theme => theme.primary.purpleOpacity,
        mb: 2,
      }}
    >
      <Typography sx={{ mb: 1 }}>{workshopName}</Typography>

      <TableFullscreen
        renderTable={props => (
          <WorkshopTotalTable
            timeRange={{
              startDate: weekStart,
              endDate: weekEnd,
            }}
            workshopId={workshopId}
            initialHeight={430}
            displayToolbar={false}
            {...props}
          />
        )}
      />

      <Box display='flex' justifyContent='space-between' alignItems='end' mt={2}>
        <Button
          component={NavLink}
          to={`/${urls.workshop}/${workshopId}/${urls.day}`}
          replace
          size='small'
        >
          Подробнее
        </Button>
      </Box>
    </DashItem>
  )
}
