import { Box, BoxProps } from '@mui/material'

export interface DataGridContainerProps extends BoxProps {}

export const DataGridContainer = (props: DataGridContainerProps) => {
  return (
    <Box
      height={600}
      borderRadius='18px'
      px='24px'
      py='15px'
      border='1px solid'
      sx={{
        backgroundColor: theme => theme.background.main,
        borderColor: theme => theme.black[10],
      }}
      {...props}
    />
  )
}
