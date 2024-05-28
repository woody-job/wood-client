import { Dispatch, FC, SetStateAction } from 'react'

import { Box, BoxProps, Typography } from '@mui/material'

import { DatePicker } from '@/shared/ui/date-picker'

import { Dayjs } from 'dayjs'

export type TimeRangeInputsProps = BoxProps & {
  range: { startDate: Dayjs; endDate: Dayjs }
  setRange: Dispatch<SetStateAction<{ startDate: Dayjs; endDate: Dayjs }>>
}

export const TimeRangeInputs: FC<TimeRangeInputsProps> = props => {
  const { range, setRange, ...boxProps } = props

  const handleChangeStartDate = (value: Dayjs | null) => {
    value &&
      setRange(prev => ({
        ...prev,
        startDate: value,
      }))
  }
  const handleChangeEndDate = (value: Dayjs | null) => {
    value &&
      setRange(prev => ({
        ...prev,
        endDate: value,
      }))
  }

  return (
    <Box {...boxProps}>
      <Typography variant='subtitle1'>Временной диапазон</Typography>

      <Box display='flex' gap={2} mb={3} mt={2}>
        <DatePicker
          value={range.startDate}
          onAccept={handleChangeStartDate}
          sx={{ maxWidth: 'fit-content' }}
        />
        <DatePicker
          value={range.endDate}
          onAccept={handleChangeEndDate}
          sx={{ maxWidth: 'fit-content' }}
        />
      </Box>
    </Box>
  )
}
