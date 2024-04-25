import { Button, SxProps, Theme } from '@mui/material'
import { FC, ReactNode } from 'react'

export interface DashItemProps {
  itemVariant?: 'default' | 'subitem'
  isActive?: boolean
  children: ReactNode
}

export const MenuSidebarItem: FC<DashItemProps> = props => {
  const { itemVariant = 'default', children, isActive } = props

  const subitemStyles: SxProps<Theme> = {
    width: '100%',
    px: '10px',
    pl: '40px',
    justifyContent: 'start',
    fontSize: '14px',
  }

  const defaultStyles: SxProps<Theme> = {
    width: '100%',
    py: '10px',
    px: '15px',
    justifyContent: 'start',
    fontSize: '16px',
  }

  const activeStyles: SxProps<Theme> = {
    backgroundColor: theme => theme.black[10],
  }

  return (
    <Button
      component='div'
      variant='text'
      size='medium'
      sx={{
        ...(itemVariant === 'default' ? defaultStyles : subitemStyles),
        ...(isActive ? activeStyles : {}),
      }}
    >
      {children}
    </Button>
  )
}
