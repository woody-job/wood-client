import { FC } from 'react'

import { BeamsRangeAmountShipment } from '@/widgets/beamsRangeAmountShipment'
import { useTimeRangeInSearchParams } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'
import { TimeRangeInputs } from '@/shared/ui/time-range'

export const BeamShipmentTimeRangeInfo: FC = () => {
  const { timeRange, handleSetTimeRange } = useTimeRangeInSearchParams()

  return (
    <CustomTabPanel tabPanelValue={'time-range'} value={'time-range'}>
      <TimeRangeInputs range={timeRange} setRange={handleSetTimeRange} />

      <BeamsRangeAmountShipment timeRange={timeRange} />
    </CustomTabPanel>
  )
}
