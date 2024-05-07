import { FC } from 'react'

import { Box, BoxProps } from '@mui/material'

export const ModalContent: FC<BoxProps> = props => {
  const { sx, ...restProps } = props

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 4,
        p: 4,
        ...sx,
      }}
      {...restProps}
    />
  )
}
