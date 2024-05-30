import { FC, useMemo } from 'react'

import { useParams } from 'react-router-dom'

import { Serie } from '@nivo/line'

import { Box, Skeleton } from '@mui/material'

import { useFetchBeamInStatsForWorkshopQuery } from '@/entities/beam-in'
import { getRussianDayAndMonth } from '@/shared/libs/helpers'
import { TimeRange } from '@/shared/types'
import { CustomLine } from '@/shared/ui'

type WorkshopWoodsDiametersLineProps = {
  timeRange: TimeRange
}

export const WorkshopWoodsDiametersLine: FC<WorkshopWoodsDiametersLineProps> = ({ timeRange }) => {
  const { workshopId } = useParams()

  const { data: beamInStats, isLoading: isLoadingBeamInStats } =
    useFetchBeamInStatsForWorkshopQuery({
      workshopId: workshopId ? Number(workshopId) : -1,
      startDate: timeRange.startDate.toISOString(),
      endDate: timeRange.endDate.toISOString(),
    })

  const series: Serie[] = useMemo(
    () => [
      {
        id: 'WorkshopWoodsDiametersLine',
        data: beamInStats
          ? beamInStats.map(beamInStat => ({
              x: getRussianDayAndMonth(beamInStat.x),
              y: beamInStat.y,
            }))
          : [],
      },
    ],
    [beamInStats]
  )

  const min = beamInStats ? Math.min(...beamInStats.map(item => item.y)) : 0
  const max = beamInStats ? Math.max(...beamInStats.map(item => item.y)) : 0

  if (isLoadingBeamInStats) {
    return <Skeleton variant='rounded' sx={{ height: 240, width: 410, mx: 'auto' }} />
  }

  return (
    <Box height={300} width={'100%'}>
      <CustomLine
        data={series}
        margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
        yScale={{
          type: 'linear',
          min: min - 40,
          max: max + 40,
          stacked: true,
          reverse: false,
        }}
        yFormat={value => (value as number).toFixed(2) + ' м3'}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Общий объем всех диаметров',
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
      />
    </Box>
  )
}
