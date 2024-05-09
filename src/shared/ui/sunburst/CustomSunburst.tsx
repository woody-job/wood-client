import { ReactNode } from 'react'

import { ResponsiveSunburst, SunburstSvgProps } from '@nivo/sunburst'

import { Box, BoxProps, Typography } from '@mui/material'

import { chartColors, colorTokens } from '@/shared/constants'
import { useNivoTheme } from '@/shared/libs/hooks'
import { ColorItem, CustomTooltip } from '@/shared/ui'

export type CustomSunburstProps<T> = Partial<SunburstSvgProps<T>> & {
  data: T
  containerProps?: BoxProps
  children?: ReactNode
}

export const CustomSunburst = <T,>({
  data,
  containerProps,
  children,
  ...restProps
}: CustomSunburstProps<T>) => {
  const nivoTheme = useNivoTheme()

  return (
    <Box
      position='relative'
      width='450px'
      height='450px'
      display='flex'
      justifyContent='center'
      alignItems='center'
      {...containerProps}
    >
      <Box>{children}</Box>

      <Box position='absolute' width='100%' height='100%'>
        <ResponsiveSunburst
          data={data}
          margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
          colors={chartColors}
          borderColor={colorTokens.black[40]}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          childColor={{ from: 'color', modifiers: [['opacity', 0.75]] }}
          borderWidth={1}
          theme={nivoTheme}
          enableArcLabels
          tooltip={({ id, color, formattedValue }) => (
            <CustomTooltip>
              <ColorItem bgcolor={color} />
              <Typography>
                {id} - {formattedValue}
              </Typography>
            </CustomTooltip>
          )}
          {...restProps}
        />
      </Box>
    </Box>
  )
}
