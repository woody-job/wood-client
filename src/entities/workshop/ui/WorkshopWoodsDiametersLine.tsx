import { useMemo } from 'react'

import { Serie } from '@nivo/line'

import { Box } from '@mui/material'

import { shortRuDateFormater } from '@/shared/constants'
import { CustomLine } from '@/shared/ui'

const data = [
  { date: '2024-04-01', volume: 30 },
  { date: '2024-04-02', volume: 20 },
  { date: '2024-04-03', volume: 30 },
  { date: '2024-04-04', volume: 40 },
  { date: '2024-04-05', volume: 30 },
]

export const WorkshopWoodsDiametersLine = () => {
  const min = Math.min(...data.map(item => item.volume))
  const max = Math.min(...data.map(item => item.volume))

  const series: Serie[] = useMemo(
    () => [
      {
        id: 'WorkshopWoodsDiametersLine',
        data: data.map(datum => ({
          x: shortRuDateFormater.format(new Date(datum.date)),
          y: datum.volume,
        })),
      },
    ],
    [data]
  )

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
