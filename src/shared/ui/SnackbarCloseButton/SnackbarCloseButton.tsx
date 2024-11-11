import { SnackbarKey, useSnackbar } from 'notistack'
import { IconButton } from '@mui/material'

import { CrossIcon } from '@/shared/ui/icons'
import { FC } from 'react'
type SnackbarCloseButtonProps = {
  snackbarKey: SnackbarKey
}

export const SnackbarCloseButton: FC<SnackbarCloseButtonProps> = ({ snackbarKey }) => {
  const { closeSnackbar } = useSnackbar()

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)} sx={{ color: 'white' }}>
      <CrossIcon />
    </IconButton>
  )
}
