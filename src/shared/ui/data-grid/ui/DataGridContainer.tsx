import { Box, BoxProps } from '@mui/material'

export interface DataGridContainerProps extends BoxProps {}

export const DataGridContainer = (props: DataGridContainerProps) => {
  return (
    <Box
      sx={{
        height: 600,
        backgroundColor: theme => theme.background.main,
        borderRadius: '18px',
        px: '24px',
        py: '15px',
      }}
      {...props}
    />
  )
}
