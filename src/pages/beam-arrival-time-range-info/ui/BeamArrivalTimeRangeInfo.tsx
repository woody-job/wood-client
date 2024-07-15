import { FC } from 'react'

import { BeamsRangeAmountArrival } from '@/widgets/beamsRangeAmountArrival'
import { useTimeRangeInSearchParams } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'
import { TimeRangeInputs } from '@/shared/ui/time-range'

export const BeamArrivalTimeRangeInfo: FC = () => {
  const { timeRange, handleSetTimeRange } = useTimeRangeInSearchParams()

  return (
    <CustomTabPanel tabPanelValue={'time-range'} value={'time-range'}>
      <TimeRangeInputs range={timeRange} setRange={handleSetTimeRange} />

      <BeamsRangeAmountArrival timeRange={timeRange} />
    </CustomTabPanel>
  )
}
