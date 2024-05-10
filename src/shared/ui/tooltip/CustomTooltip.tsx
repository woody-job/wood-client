import { FC } from 'react'

import { Box, BoxProps } from '@mui/material'

export const CustomTooltip: FC<BoxProps> = props => {
  return (
    <Box
      zIndex={10}
      display='flex'
      alignItems='center'
      gap={1}
      borderRadius='10px'
      bgcolor={theme => theme.white[100]}
      border={theme => `1px solid ${theme.black[20]}`}
      py={1}
      px={2}
      {...props}
    />
  )
}
