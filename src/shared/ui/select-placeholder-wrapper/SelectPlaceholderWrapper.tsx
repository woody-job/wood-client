import { FC, ReactNode } from 'react'

import { Box } from '@mui/material'

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
        overflow: 'hidden',
        ...(shouldShowPlaceholder
          ? {
              '&::before': {
                position: 'absolute',
                content: `"${placeholderText}"`,
                textWrap: 'nowrap',
                wordBreak: 'break-all',
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
