import { ThemeOptions } from '@mui/material'
import { colorTokens } from '@/shared/constants'
import { buttonMUI, selectMUI, textFieldMUI } from '@/entities/theme/model/components'
import { ThemeModes } from '@/entities/theme/types'
import { modeSwitcher } from '@/shared/libs/helpers'

interface ColorWithOpacity {
  100: string
  80: string
  40: string
  20: string
  10: string
  5: string
}

export interface CustomTheme {
  primary: {
    brand: string
    blue: string
    purple: string
    purpleOpacity: string
    background: string
  }
  secondary: {
    indigo: string
    purple: string
    cyan: string
    blue: string
    green: string
    mint: string
    yellow: string
    orange: string
    red: string
  }
  white: ColorWithOpacity
  black: ColorWithOpacity
  background: {
    main: string
  }
}

export const getThemeSettings = (mode: ThemeModes): ThemeOptions => {
  return {
    primary: modeSwitcher(
      {
        ...colorTokens.primary,
        background: colorTokens.white['100'],
      },
      {
        ...colorTokens.primary,
        brand: colorTokens.primary.purple,
        blue: colorTokens.white['15'],
        purpleOpacity: colorTokens.white['5'],
        background: colorTokens.black['100'],
      }
    )(mode),
    secondary: {
      ...colorTokens.secondary,
    },
    white: modeSwitcher(colorTokens.white, colorTokens.black)(mode),
    black: modeSwitcher(colorTokens.black, colorTokens.white)(mode),
    background: {
      main: modeSwitcher(colorTokens.background.main, colorTokens.white['5'])(mode),
    },

    palette: {
      mode: mode,
      primary: modeSwitcher(
        {
          main: colorTokens.primary.brand,
          contrastText: colorTokens.white['100'],
        },
        {
          main: colorTokens.primary.purple,
          contrastText: colorTokens.white['100'],
        }
      )(mode),
      secondary: {
        main: colorTokens.secondary.indigo,
      },
      background: {
        default: modeSwitcher(colorTokens.white['100'], colorTokens.black['100'])(mode),
      },
    },

    typography: {
      fontFamily: 'Inter, sans-serif',
      fontWeightBold: 600,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: theme => ({
          body: {
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              width: '0.4em',
              height: '0.6em',
              backgroundColor: theme.white['80'],
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              backgroundColor: theme.black[80],
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
              backgroundColor: theme.white['100'],
            },
          },
        }),
      },
      MuiButton: buttonMUI,
      MuiTextField: textFieldMUI,
      MuiSelect: selectMUI,
    },
  }
}

declare module '@mui/material' {
  interface Theme extends CustomTheme {}

  interface ThemeOptions extends CustomTheme {}
}
