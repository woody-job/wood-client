import { Theme } from '@nivo/core'

import { useTheme } from '@mui/material'

export const useNivoTheme = (): Theme => {
  const theme = useTheme()

  return {
    tooltip: {
      container: {
        background: theme.white['100'],
      },
    },
    axis: {
      ticks: {
        line: {
          stroke: theme.black['80'],
          strokeLinecap: 'square',
        },
        text: {
          fill: theme.black['100'],
        },
      },
      legend: {
        text: {
          fill: theme.black['100'],
        },
      },
      domain: {
        line: {
          stroke: theme.black['40'],
          strokeWidth: 2,
          strokeLinecap: 'square',
        },
      },
    },
  }
}
