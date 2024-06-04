import { Box, BoxProps } from '@mui/material'

export interface DataGridContainerProps extends BoxProps {}

export const DataGridContainer = (props: DataGridContainerProps) => {
  const { sx, ...restProps } = props

  return (
    <Box
      height={600}
      borderRadius='18px'
      px='24px'
      py='15px'
      border='1px solid'
      position='relative'
      sx={{
        backgroundColor: theme => theme.background.main,
        borderColor: theme => theme.black[10],
        '&:hover .data-grid-fullscreen': {
          pointerEvents: 'all',
          opacity: '1',
        },
        '& .data-grid-fullscreen': {
          pointerEvents: 'none',
          opacity: '0',
        },
        ...sx,
      }}
      {...restProps}
    />
  )
}
