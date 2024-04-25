import { Box, BoxProps } from '@mui/material'
import { FC } from 'react'

export interface DashItemProps extends BoxProps {}

export const DashItem: FC<DashItemProps> = props => {
  return (
    <Box
      px={3}
      py={3}
      bgcolor={theme => theme.black['5']}
      borderRadius='18px'
      boxShadow={1}
      {...props}
    />
  )
}
