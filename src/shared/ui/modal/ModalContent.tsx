import { FC } from 'react'

import { Box, BoxProps } from '@mui/material'

export type ModalContentProps = BoxProps & {
  fullscreen?: boolean
}

export const ModalContent: FC<ModalContentProps> = props => {
  const { sx, fullscreen, ...restProps } = props

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
        ...(fullscreen ? { height: '100%', width: '100%', borderRadius: '0' } : {}),
      }}
      {...restProps}
    />
  )
}
