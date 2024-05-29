import { FC, useMemo } from 'react'

import { useParams } from 'react-router-dom'

import { Serie } from '@nivo/line'

import { Box, Skeleton } from '@mui/material'

import { useFetchProfitStatsForWorkshopQuery } from '@/entities/workshop-out'
import { getRussianDayAndMonth } from '@/shared/libs/helpers'
import { TimeRange } from '@/shared/types'
import { CustomLine } from '@/shared/ui'

type WorkshopWoodsTotalLineProps = {
  timeRange: TimeRange
  unitSelection: string
}
export const WorkshopWoodsTotalLine: FC<WorkshopWoodsTotalLineProps> = ({
  timeRange,
  unitSelection,
}) => {
  const { workshopId } = useParams()

  const { data: workshopProfitStats, isLoading: isLoadingWorkshopProfitStats } =
    useFetchProfitStatsForWorkshopQuery(
      {
        workshopId: workshopId ? Number(workshopId) : -1,
        startDate: timeRange.startDate.toISOString(),
        endDate: timeRange.endDate.toISOString(),
        perUnit: unitSelection === 'perUnit',
      },
      { refetchOnMountOrArgChange: true }
    )

  const series: Serie[] = useMemo(() => {
    if (!workshopProfitStats) {
      return []
    }

    return [
      {
        id: 'WorkshopWoodsDiametersLine',
        data: workshopProfitStats.map(profitStat => ({
          x: getRussianDayAndMonth(profitStat.x),
          y: profitStat.y,
        })),
      },
    ]
  }, [workshopProfitStats])

  const max = workshopProfitStats ? Math.max(...workshopProfitStats.map(item => item.y)) : 0
  const min = workshopProfitStats ? Math.min(...workshopProfitStats.map(item => item.y)) : 0

  if (isLoadingWorkshopProfitStats) {
    return <Skeleton variant='rounded' sx={{ height: 240, width: 410, mx: 'auto' }} />
  }

  return (
    <Box height={300} width={'100%'}>
      <CustomLine
        data={series}
        margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
        tooltipFormat={value => `${value} р.`}
        yScale={{
          type: 'linear',
          min: min - 40,
          max: max + 40,
          stacked: true,
          reverse: false,
        }}
        yFormat={value => Number(value).toFixed(2) + ' р.'}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0,
          format: string => string + 'р.',
        }}
      />
    </Box>
  )
}
