import { FC } from 'react'

import { Box, BoxProps } from '@mui/material'

export const ColorItem: FC<BoxProps> = props => {
  return (
    <Box
      width='20px'
      height='20px'
      borderRadius='10px'
      border={theme => `1px solid ${theme.black[20]}`}
      {...props}
    />
  )
}
