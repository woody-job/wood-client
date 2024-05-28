import { ChangeEventHandler, Dispatch, FC, SetStateAction } from 'react'

import { Box, Input, Typography } from '@mui/material'

import { TimeRangeState } from '@/shared/ui/time-range/TimeRangeInputs.types.ts'

export type TimeRangeInputsProps = {
  range: TimeRangeState
  setRange: Dispatch<SetStateAction<TimeRangeState>>
}

export const TimeRangeInputs: FC<TimeRangeInputsProps> = props => {
  const { range, setRange } = props

  const handleChangeStartDate: ChangeEventHandler<HTMLInputElement> = e => {
    setRange(prev => ({
      ...prev,
      startDate: e.target.value,
    }))
  }
  const handleChangeEndDate: ChangeEventHandler<HTMLInputElement> = e => {
    setRange(prev => ({
      ...prev,
      endDate: e.target.value,
    }))
  }

  return (
    <Box>
      <Typography variant='subtitle1'>Временной диапазон</Typography>

      <Box display='flex' gap={2} mb={3}>
        <Input type='date' value={range.startDate} onChange={handleChangeStartDate} />
        <Input type='date' value={range.endDate} onChange={handleChangeEndDate} />
      </Box>
    </Box>
  )
}
