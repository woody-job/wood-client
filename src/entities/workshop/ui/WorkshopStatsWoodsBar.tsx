import { FC, useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import { mapDataToWoodsBar } from '@/entities/workshop/libs'
import { WorkshopOutStat } from '@/entities/workshop-out'
import { ColorItem, CustomBar, CustomTooltip } from '@/shared/ui'

type WorkshopStatsWoodsBarProps = {
  woods: WorkshopOutStat[]
}

export const WorkshopStatsWoodsBar: FC<WorkshopStatsWoodsBarProps> = ({ woods }) => {
  const { items, keys } = useMemo(() => {
    if (!woods) {
      return { items: [], keys: [] }
    }

    return mapDataToWoodsBar(woods)
  }, [woods])

  return (
    <Box height='230px' width='100%' borderRadius={4}>
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
