import { FC } from 'react'

import { Box, BoxProps, Typography } from '@mui/material'

import { TimeRange } from '@/shared/types'
import { DatePicker } from '@/shared/ui/date-picker'

import { Dayjs } from 'dayjs'

export type TimeRangeInputsProps = BoxProps & {
  range: TimeRange
  setRange: (value: TimeRange) => void
}

export const TimeRangeInputs: FC<TimeRangeInputsProps> = props => {
  const { range, setRange, ...boxProps } = props

  const handleChangeStartDate = (value: Dayjs | null) => {
    value &&
      setRange({
        ...range,
        startDate: value,
      })
  }
  const handleChangeEndDate = (value: Dayjs | null) => {
    value &&
      setRange({
        ...range,
        endDate: value,
      })
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
