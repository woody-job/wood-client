import { ComponentsOverrides, ComponentsProps, ComponentsVariants, Theme } from '@mui/material'

export interface ButtonMUI {
  defaultProps?: ComponentsProps['MuiButton']
  styleOverrides?: ComponentsOverrides<Theme>['MuiButton']
  variants?: ComponentsVariants<Theme>['MuiButton']
}

export const buttonMUI: ButtonMUI = {
  styleOverrides: {
    root: {
      textTransform: 'none',
      backgroundColor: 'transparent',
      fontSize: '1rem',
      fontWeight: '400',
      padding: '0',
      transition: 'all 0.3s',
    },
  },
  defaultProps: {
    variant: 'contained',
    size: 'medium',
    disableRipple: true,
  },
  variants: [
    {
      props: { variant: 'contained' },
      style: ({ theme }) => ({
        backgroundColor: theme.primary.brand,
        color: theme.white['100'],
        '&:hover': {
          opacity: 0.8,
        },
      }),
    },
    {
      props: { variant: 'gray' },
      style: ({ theme }) => ({
        backgroundColor: theme.black[10],
        color: theme.black[100],
        '&:hover': {
          backgroundColor: theme.black[20],
        },
      }),
    },
    {
      props: { variant: 'outlined' },
      style: ({ theme }) => ({
        border: `1px solid ${theme.black[10]}`,
        backgroundColor: 'transparent',
        color: theme.black[100],
        '&:hover': {
          backgroundColor: theme.black[5],
          border: `1px solid ${theme.black[10]}`,
        },
      }),
    },
    {
      props: { variant: 'text' },
      style: ({ theme }) => ({
        color: theme.black[100],
        '&:hover': {
          backgroundColor: theme.black[5],
        },
      }),
    },

    {
      props: { size: 'large' },
      style: {
        fontSize: '18px',
        padding: '16px 24px',
        borderRadius: '18px',
        lineHeight: '1',
      },
    },
    {
      props: { size: 'medium' },
      style: {
        fontSize: '18px',
        padding: '10px 18px',
        borderRadius: '14px',
        lineHeight: '1.25',
      },
    },
    {
      props: { size: 'small' },
      style: {
        fontSize: '15px',
        padding: '4px 8px',
        borderRadius: '10px',
        lineHeight: '1.5',
      },
    },
  ],
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gray: true
  }
}
