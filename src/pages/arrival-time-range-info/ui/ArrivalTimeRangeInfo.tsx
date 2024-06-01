import { FC } from 'react'

import { WoodsRangeAmountArrival } from '@/widgets/woodsRangeAmountArrival'
import { useTimeRangeInSearchParams } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'
import { TimeRangeInputs } from '@/shared/ui/time-range'

export const ArrivalTimeRangeInfo: FC = () => {
  const { timeRange, handleSetTimeRange } = useTimeRangeInSearchParams()

  return (
    <CustomTabPanel tabPanelValue={'time-range'} value={'time-range'}>
      <TimeRangeInputs range={timeRange} setRange={handleSetTimeRange} />

      <WoodsRangeAmountArrival
        endDate={timeRange.endDate.toISOString()}
        startDate={timeRange.startDate.toISOString()}
      />
    </CustomTabPanel>
  )
}
