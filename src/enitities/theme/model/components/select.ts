import { ComponentsOverrides, ComponentsProps, ComponentsVariants, Theme } from '@mui/material'

export interface SelectMUI {
  defaultProps?: ComponentsProps['MuiSelect']
  styleOverrides?: ComponentsOverrides<Theme>['MuiSelect']
  variants?: ComponentsVariants<Theme>['MuiSelect']
}

export const selectMUI: SelectMUI = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: '16px',
      '&.Mui-focused': {
        boxShadow: `0px 0px 0px 4px ${theme.black[5]}`,
        outline: 'none',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid',
        borderColor: `${theme.black[20]}!important`,
      },
    }),
  },
}
