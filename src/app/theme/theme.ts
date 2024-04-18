import { createTheme } from '@mui/material'
import { tokens } from '@/shared/constants/tokens'

export const theme = createTheme({
  palette: {
    primary: {
        main: tokens.primary.brand,
    },
    secondary: {
        main: tokens.secondary.cyan,
    },
    background: {
        default: tokens.black["5"],
        paper: tokens.black["10"],
    },
    divider: tokens.black["10"],
  },
})
