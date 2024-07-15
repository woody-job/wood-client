import { FC } from 'react'

import { BeamsDayAmountShipment } from '@/widgets/beamsDayAmountShipment'
import { useDateInSearchParams } from '@/shared/libs/hooks'
import { CustomTabPanel, DatePicker } from '@/shared/ui'

import { Dayjs } from 'dayjs'

export const BeamShipmentDayInfo: FC = () => {
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

      <BeamsDayAmountShipment selectedDate={date.toISOString()} />
    </CustomTabPanel>
  )
}
