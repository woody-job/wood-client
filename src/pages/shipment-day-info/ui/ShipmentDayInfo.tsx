import { FC } from 'react'

import { WoodsDayAmountShipment } from '@/widgets/woodsDayAmountShipment'
import { useDateInSearchParams } from '@/shared/libs/hooks'
import { CustomTabPanel, DatePicker } from '@/shared/ui'

import { Dayjs } from 'dayjs'

export const ShipmentDayInfo: FC = () => {
  const { date, handleSetDate } = useDateInSearchParams({
    defaultToday: true,
  })

  const handleAccept = (value: Dayjs | null) => {
    if (value) {
      handleSetDate(value)
    }
  }

  return (
    <CustomTabPanel tabPanelValue={'day'} value={'day'}>
      <DatePicker value={date} onAccept={handleAccept} sx={{ maxWidth: 'fit-content' }} />

      <WoodsDayAmountShipment selectedDate={date.toISOString()} />
    </CustomTabPanel>
  )
}
