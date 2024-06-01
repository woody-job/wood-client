import { FC } from 'react'

import { WoodsDayAmountArrival } from '@/widgets/woodsDayAmountArrival'
import { useDateInSearchParams } from '@/shared/libs/hooks'
import { CustomTabPanel, DatePicker } from '@/shared/ui'

import { Dayjs } from 'dayjs'

export const ArrivalDayInfo: FC = () => {
  const { date, handleSetDate } = useDateInSearchParams()

  const handleAccept = (value: Dayjs | null) => {
    if (value) {
      handleSetDate(value)
    }
  }

  return (
    <CustomTabPanel tabPanelValue={'day'} value={'day'}>
      <DatePicker value={date} onAccept={handleAccept} sx={{ maxWidth: 'fit-content' }} />

      <WoodsDayAmountArrival selectedDate={date.toISOString()} />
    </CustomTabPanel>
  )
}
