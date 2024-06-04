import { FC } from 'react'

import { ButtonProps, IconButton } from '@mui/material'

import { CrossIcon } from '@/shared/ui/icons'

export type ModalCloseButtonProps = ButtonProps

export const ModalCloseButton: FC<ModalCloseButtonProps> = props => {
  return (
    <IconButton sx={{ position: 'absolute', top: '0', right: '0' }} {...props}>
      <CrossIcon />
    </IconButton>
  )
}
