import { FC, useMemo } from 'react'

import { useParams } from 'react-router-dom'

import { Box, Skeleton, Typography } from '@mui/material'

import { mapDataToWoodsBar } from '@/entities/workshop/libs'
import { useFetchWorkshopOutStatsForWorkshopQuery } from '@/entities/workshop-out'
import { TimeRange } from '@/shared/types'
import { ColorItem, CustomBar, CustomTooltip } from '@/shared/ui'

type WorkshopWoodsBarProps = {
  timeRange: TimeRange
}

export const WorkshopWoodsBar: FC<WorkshopWoodsBarProps> = ({ timeRange }) => {
  const { workshopId } = useParams()

  const { data: workshopOutStats, isLoading: isLoadingWorkshopOutStats } =
    useFetchWorkshopOutStatsForWorkshopQuery({
      workshopId: workshopId ? Number(workshopId) : -1,
      startDate: timeRange.startDate.toISOString(),
      endDate: timeRange.endDate.toISOString(),
    })

  const { items, keys } = useMemo(() => {
    if (!workshopOutStats) {
      return { items: [], keys: [] }
    }

    return mapDataToWoodsBar(workshopOutStats)
  }, [workshopOutStats])

  if (isLoadingWorkshopOutStats) {
    return <Skeleton variant='rounded' sx={{ height: 240, width: 410, mx: 'auto' }} />
  }

  return (
    <Box height='280px' width='100%' borderRadius={4}>
      <CustomBar
        data={items}
        keys={keys}
        indexBy='day'
        label={data => `${data.id}`}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        margin={{ top: 10, right: 10, bottom: 25, left: 50 }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Процент от выхода',
          legendPosition: 'middle',
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        role='application'
        ariaLabel='woods bar chart'
        tooltip={({ formattedValue, id, color }) => (
          <CustomTooltip>
            <ColorItem bgcolor={color} />

            <Typography>
              {id} - {formattedValue}%
            </Typography>
          </CustomTooltip>
        )}
      />
    </Box>
  )
}
