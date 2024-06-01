import { useDateInSearchParams } from '@/shared/libs/hooks'
import { CustomTabPanel, DatePicker } from '@/shared/ui'
import { WoodsDayAmountArrival } from '@/widgets/woodsDayAmountArrival'
import { Dayjs } from 'dayjs'
import { FC } from 'react'

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
