import { FC } from 'react'

import { WoodsRangeAmountShipment } from '@/widgets/woodsRangeAmountShipment'
import { useTimeRangeInSearchParams } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'
import { TimeRangeInputs } from '@/shared/ui/time-range'

export const ShipmentTimeRangeInfo: FC = () => {
  const { timeRange, handleSetTimeRange } = useTimeRangeInSearchParams()

  return (
    <CustomTabPanel tabPanelValue={'time-range'} value={'time-range'}>
      <TimeRangeInputs range={timeRange} setRange={handleSetTimeRange} />

      <WoodsRangeAmountShipment
        endDate={timeRange.endDate.toISOString()}
        startDate={timeRange.startDate.toISOString()}
      />
    </CustomTabPanel>
  )
}
