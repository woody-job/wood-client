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
        borderRadius: '16px',
        padding: '0',
      },
      '& .MuiOutlinedInput-root input': {},
      '& fieldset': {},
    },
  },
  variants: [
    {
      props: { variant: 'outlined' },
      style: ({ theme }) => ({
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.black[20],
          },
          '&:hover fieldset': {
            borderColor: theme.black[20],
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.black[20],
            boxShadow: `0px 0px 0px 4px ${theme.black[5]}`,
          },
        },
      }),
    },
  ],
}
