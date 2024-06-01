import { Box } from '@mui/material'
import { FC, ReactNode } from 'react'

type SelectPlaceholderWrapperProps = {
  shouldShowPlaceholder: boolean
  placeholderText: string
  children: ReactNode
}

export const SelectPlaceholderWrapper: FC<SelectPlaceholderWrapperProps> = ({
  shouldShowPlaceholder,
  placeholderText,
  children,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        ...(shouldShowPlaceholder
          ? {
              '&::before': {
                position: 'absolute',
                content: `"${placeholderText}"`,
                top: 7,
                left: 15,
                color: theme =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey['700']
                    : theme.palette.grey['400'],
              },
            }
          : {}),
      }}
    >
      {children}
    </Box>
  )
}
