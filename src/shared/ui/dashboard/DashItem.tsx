import { FC } from 'react'

import { Box, BoxProps } from '@mui/material'

export interface DashItemProps extends BoxProps {}

export const DashItem: FC<DashItemProps> = props => {
  return (
    <Box
      px={3}
      py={3}
      borderRadius='18px'
      border={theme => `1px solid ${theme.black['10']}`}
      {...props}
    />
  )
}
