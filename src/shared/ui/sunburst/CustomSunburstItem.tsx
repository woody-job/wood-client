import { ReactNode } from 'react'

import { ColorModifier } from '@nivo/colors/dist/types/inheritedColor'
import { ResponsiveSunburst, SunburstSvgProps } from '@nivo/sunburst'

import { Box, Typography } from '@mui/material'

import { useAppSelector } from '@/app/store.ts'
import { chartColors, colorTokens } from '@/shared/constants'
import { modeSwitcher } from '@/shared/libs/helpers'
import { useNivoTheme } from '@/shared/libs/hooks'
import { ColorItem, CustomTooltip } from '@/shared/ui'

export type CustomSunburstItemProps<T> = Partial<SunburstSvgProps<T>> & {
  data: T
  children?: ReactNode
}

export const CustomSunburstItem = <T,>(props: CustomSunburstItemProps<T>) => {
  const { data, ...restProps } = props

  const nivoTheme = useNivoTheme()
  const currentMode = useAppSelector(state => state.theme.mode)

  return (
    <Box position='absolute' width='100%' height='100%'>
      <ResponsiveSunburst
        data={data}
        margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
        colors={chartColors}
        borderColor={colorTokens.black[40]}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [modeSwitcher<ColorModifier>(['darker', 2], ['brighter', 5])(currentMode)],
        }}
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
  )
}
