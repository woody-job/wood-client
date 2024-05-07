import { Box, Input, Typography } from '@mui/material'

export const TimeRangeInputs = () => {
  return (
    <Box>
      <Typography variant='subtitle1'>Временной диапазон</Typography>

      <Box display='flex' gap={2} mb={3}>
        <Input type='date' />
        <Input type='date' />
      </Box>
    </Box>
  )
}
