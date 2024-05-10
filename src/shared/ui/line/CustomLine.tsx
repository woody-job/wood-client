import { FC } from 'react'

import { LineProps, ResponsiveLine } from '@nivo/line'

import { Typography } from '@mui/material'

import { chartColors } from '@/shared/constants'
import { useNivoTheme } from '@/shared/libs/hooks'
import { ColorItem, CustomTooltip } from '@/shared/ui'

export type CustomLineProps = LineProps

export const CustomLine: FC<CustomLineProps> = props => {
  const nivoTheme = useNivoTheme()

  return (
    <ResponsiveLine
      theme={nivoTheme}
      colors={chartColors}
      margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
      axisTop={null}
      axisRight={null}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      enablePoints={false}
      tooltip={({ point: { serieColor, data } }) => (
        <CustomTooltip>
          <ColorItem bgcolor={serieColor} />

          <Typography>x: {data.xFormatted}</Typography>
          <Typography>y: {data.yFormatted}</Typography>
        </CustomTooltip>
      )}
      {...props}
    />
  )
}
