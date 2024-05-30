import { NavLink } from 'react-router-dom'

import { Box, Button, Typography } from '@mui/material'

import { urls } from '@/shared/constants'
import { DashItem } from '@/shared/ui'
import { FC } from 'react'
import { LastWorkingDayStats, WorkshopOutStat } from '@/entities/workshop-out'
import { WorkshopStatsWoodsBar } from './WorkshopStatsWoodsBar'

type WorkshopDashItemProps = {
  workshopName: string
  workshopId: number
  woods: WorkshopOutStat[]
  lastWorkingDayStats: LastWorkingDayStats
}

export const WorkshopDashItem: FC<WorkshopDashItemProps> = ({
  workshopName,
  workshopId,
  woods,
  lastWorkingDayStats,
}) => {
  return (
    <DashItem
      display='flex'
      justifyContent='center'
      alignItems='start'
      flexDirection='column'
      width='500px'
      gap={1}
      sx={{
        background: theme => theme.primary.purpleOpacity,
      }}
    >
      <Typography>{workshopName}</Typography>

      <WorkshopStatsWoodsBar woods={woods} />

      <Box display='flex' justifyContent='space-between' alignItems='end' width='100%'>
        <Box display='flex' flexDirection='column'>
          <Typography variant='subtitle1' color={theme => theme.black['80']}>
            Последний рабочий день:
          </Typography>
          <Typography variant='subtitle2' color={theme => theme.black['80']}>
            <strong>Вход:</strong> {lastWorkingDayStats.totalBeamInVolume} м3
          </Typography>
          <Typography variant='subtitle2' color={theme => theme.black['80']}>
            <strong>Итого на куб:</strong> {lastWorkingDayStats.profitPerUnit} ₽
          </Typography>
        </Box>

        <Button component={NavLink} to={`/${urls.workshop}/${workshopId}`} replace size='small'>
          Подробнее
        </Button>
      </Box>
    </DashItem>
  )
}
