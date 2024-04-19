import { ComponentsProps } from '@mui/material/styles/props'
import { ComponentsOverrides } from '@mui/material/styles/overrides'
import { ComponentsVariants } from '@mui/material/styles/variants'
import { Theme } from '@mui/material'

export interface TextFieldMUI {
  defaultProps?: ComponentsProps['MuiTextField']
  styleOverrides?: ComponentsOverrides<Theme>['MuiTextField']
  variants?: ComponentsVariants<Theme>['MuiTextField']
}

export const textFieldMUI: TextFieldMUI = {
  defaultProps: {
    variant: 'outlined',
    fullWidth: true,
    size: 'small',
  },
  styleOverrides: {
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
      },
    },
  },
}
