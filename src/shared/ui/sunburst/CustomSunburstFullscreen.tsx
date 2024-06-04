import { FC } from 'react'

import { IconButton, IconButtonProps } from '@mui/material'

import { FullscreenIcon } from '@/shared/ui'

export const CustomSunburstFullscreen: FC<IconButtonProps> = props => {
  return (
    <IconButton
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 3,
        transition: 'all 300ms',
      }}
      className='sunburst-fullscreen'
      {...props}
    >
      <FullscreenIcon />
    </IconButton>
  )
}
