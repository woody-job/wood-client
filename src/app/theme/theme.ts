import { createTheme } from '@mui/material'
import { tokens } from '@/shared/constants/tokens'
import { buttonMUI } from '@/app/theme/components'

export const theme = createTheme({
  palette: {
    primary: {
      main: tokens.primary.brand,
    },
    secondary: {
      main: tokens.secondary.cyan,
    },
  },

  typography: {
    fontFamily: 'Inter, sans-serif',

    fontWeightBold: 600,
  },

  components: {
    MuiButton: buttonMUI,
  },
})
