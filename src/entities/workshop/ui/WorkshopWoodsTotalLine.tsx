import { useMemo } from 'react'

import { Serie } from '@nivo/line'

import { Box } from '@mui/material'

import { shortRuDateFormater } from '@/shared/constants'
import { CustomLine } from '@/shared/ui'

const data = [
  { date: '2024-04-01', price: 30 },
  { date: '2024-04-02', price: 20 },
  { date: '2024-04-03', price: 30 },
  { date: '2024-04-04', price: 40 },
  { date: '2024-04-05', price: 30 },
]

export const WorkshopWoodsTotalLine = () => {
  const max = useMemo(() => Math.min(...data.map(item => item.price)), [data])

  const series: Serie[] = useMemo(
    () => [
      {
        id: 'WorkshopWoodsDiametersLine',
        data: data.map(datum => ({
          x: shortRuDateFormater.format(new Date(datum.date)),
          y: datum.price,
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
        tooltipFormat={value => `${value} р.`}
        yScale={{
          type: 'linear',
          min: 0,
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
