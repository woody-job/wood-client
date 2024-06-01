import { Box, Button, ButtonProps, CircularProgress, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { FC } from 'react'

export type ButtonWithLoaderProps = {
  isLoading: boolean
  loaderSx?: SxProps<Theme>
} & ButtonProps

export const ButtonWithLoader: FC<ButtonWithLoaderProps> = ({
  isLoading,
  children,
  loaderSx,
  ...props
}) => {
  return (
    <Button {...props} disabled={isLoading}>
      <Box sx={{ position: 'relative' }}>
        {isLoading && (
          <CircularProgress
            size={20}
            sx={{ position: 'absolute', top: 1, left: -40, ...loaderSx }}
          />
        )}
        {children}
      </Box>
    </Button>
  )
}
