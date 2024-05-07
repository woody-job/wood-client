import { FC } from 'react'

import { IconButton, IconButtonProps } from '@mui/material'

import { LogoutIcon } from '@/shared/ui'

export const LogoutButton: FC<IconButtonProps> = props => {
  return (
    <IconButton aria-label={'Выйти из аккаунта'} {...props}>
      <LogoutIcon />
    </IconButton>
  )
}
