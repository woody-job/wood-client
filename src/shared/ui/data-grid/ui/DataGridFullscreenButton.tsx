import { FC } from 'react'

import { ButtonProps, IconButton } from '@mui/material'

import { FullscreenIcon } from '@/shared/ui'

export const DataGridFullscreenButton: FC<ButtonProps> = props => {
  return (
    <IconButton
      size='small'
      sx={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        transition: 'all 300ms',
        zIndex: '100',
      }}
      className='data-grid-fullscreen'
      {...props}
    >
      <FullscreenIcon />
    </IconButton>
  )
}
