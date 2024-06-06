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
        ...(shouldShowPlaceholder
          ? {
              '&::before': {
                position: 'absolute',
                content: `"${placeholderText}"`,
                textWrap: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-all',
                width: 'calc(100% - 40px)',
                top: 7,
                left: 0,
                ml: '10px',
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
