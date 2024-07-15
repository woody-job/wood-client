import { FC } from 'react'

import {
  DatePicker as MUIDatePicker,
  DatePickerProps as MUIDatePickerProps,
} from '@mui/x-date-pickers'

import { Dayjs } from 'dayjs'

type DatePickerProps = {
  // Custom props here
} & MUIDatePickerProps<Dayjs, boolean>

export const DatePicker: FC<DatePickerProps> = ({ ...props }) => {
  return (
    <MUIDatePicker
      format={'DD.MM.YYYY'}
      label={'День, месяц и год'}
      views={['year', 'month', 'day']}
      slotProps={{
        inputAdornment: {
          sx: {
            mr: 2,
          },
        },
      }}
      {...props}
    />
  )
}
