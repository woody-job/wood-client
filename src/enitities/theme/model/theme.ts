import { ThemeOptions } from '@mui/material'
import { tokens } from '@/shared/constants/tokens'
import { buttonMUI, textFieldMUI, selectMUI } from '@/enitities/theme/model/components'
import { ThemeModes } from '@/enitities/theme/types'
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
        ...tokens.primary,
        background: tokens.white['100'],
      },
      {
        ...tokens.primary,
        brand: tokens.primary.purple,
        purpleOpacity: tokens.white['5'],
        background: tokens.black['100'],
      }
    )(mode),
    secondary: {
      ...tokens.secondary,
    },
    white: modeSwitcher(tokens.white, tokens.black)(mode),
    black: modeSwitcher(tokens.black, tokens.white)(mode),
    background: {
      main: modeSwitcher(tokens.background.main, tokens.white['5'])(mode),
    },

    palette: {
      mode: mode,
      primary: modeSwitcher(
        {
          main: tokens.primary.brand,
          contrastText: tokens.white['100'],
        },
        {
          main: tokens.primary.purple,
          contrastText: tokens.white['100'],
        }
      )(mode),
      secondary: {
        main: tokens.secondary.indigo,
      },
      background: {
        default: modeSwitcher(tokens.white['100'], tokens.black['100'])(mode),
      },
    },

    typography: {
      fontFamily: 'Inter, sans-serif',
      fontWeightBold: 600,
    },

    components: {
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
