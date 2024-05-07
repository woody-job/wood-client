import { FC, ReactNode } from 'react'

import { Box } from '@mui/material'

export interface CustomTabPanelProps {
  children?: ReactNode
  tabPanelValue: string
  value: string
}

export const CustomTabPanel: FC<CustomTabPanelProps> = props => {
  const { children, value, tabPanelValue, ...other } = props

  if (value !== tabPanelValue) return null

  return (
    <div role='tabpanel' {...other}>
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  )
}
