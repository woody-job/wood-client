import { ResponsiveBar, ResponsiveBarSvgProps } from '@nivo/bar'
import { BarDatum } from '@nivo/bar/dist/types/types'

import { chartColors } from '@/shared/constants'
import { useNivoTheme } from '@/shared/libs/hooks'

export type CustomBarProps<RawDatum extends BarDatum> = Omit<
  ResponsiveBarSvgProps<RawDatum>,
  'data'
> & {
  data: readonly RawDatum[]
}

export const CustomBar = <T extends BarDatum>(props: CustomBarProps<T>) => {
  const nivoTheme = useNivoTheme()

  return (
    <ResponsiveBar
      margin={{ top: 10, right: 10, bottom: 50, left: 50 }}
      padding={0.3}
      colors={chartColors}
      axisTop={null}
      axisRight={null}
      theme={nivoTheme}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      role='application'
      {...props}
    />
  )
}
