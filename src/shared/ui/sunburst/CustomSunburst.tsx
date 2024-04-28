import { ResponsiveSunburst, SunburstSvgProps } from '@nivo/sunburst'
import { FC, ReactNode } from 'react'
import { Box, BoxProps, useTheme } from '@mui/material'
import { useNivoTheme } from '@/shared/libs/hooks'
import { colorTokens } from '@/shared/constants'

export type CustomSunburstProps<T = unknown> = Partial<SunburstSvgProps<T>> & {
  data: T
  containerProps?: BoxProps
  children?: ReactNode
}

export const CustomSunburst: FC<CustomSunburstProps> = ({
  data,
  containerProps,
  children,
  ...restProps
}) => {
  const theme = useTheme()
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
          colors={{ scheme: 'paired' }}
          borderColor={colorTokens.black[40]}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          childColor={{ from: 'color', modifiers: [['brighter', 0.7]] }}
          borderWidth={1}
          theme={nivoTheme}
          enableArcLabels
          {...restProps}
        />
      </Box>
    </Box>
  )
}
