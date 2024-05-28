import { useState } from 'react'

import { Tab, Tabs, Typography } from '@mui/material'

import { WoodsDayAmountShipment } from '@/widgets/woodsDayAmountShipment'
import { WoodsRangeAmountShipment } from '@/widgets/woodsRangeAmountShipment'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'
import { DatePicker } from '@/shared/ui/date-picker'
import { TimeRangeInputs } from '@/shared/ui/time-range'

import dayjs, { Dayjs } from 'dayjs'

export const Shipment = () => {
  const tabs = [
    { id: 'day', name: 'За день' },
    { id: 'few-days', name: 'За несколько дней' },
  ]

  const { currentTab, handleChangeTab } = useSearchParamsTabs(
    appSearchParams.currentTab,
    tabs,
    tab => tab.id,
    tabs[0]
  )

  const [selectedDate, setSelectedDate] = useState(() => dayjs())
  const [timeRange, setTimeRange] = useState({ startDate: dayjs(), endDate: dayjs() })

  const handleAccept = (value: Dayjs | null) => {
    value && setSelectedDate(value)
  }

  return (
    <>
      <Typography variant='h5' sx={{ mb: 5 }}>
        Отгрузки
      </Typography>
      <Tabs value={currentTab.id} onChange={handleChangeTab} sx={{ mt: 5 }}>
        {tabs.map(tab => (
          <Tab key={tab.name} label={tab.name} value={tab.id} />
        ))}
      </Tabs>

      <CustomTabPanel tabPanelValue={currentTab.id} value={'day'}>
        <DatePicker value={selectedDate} onAccept={handleAccept} sx={{ maxWidth: 'fit-content' }} />

        <WoodsDayAmountShipment selectedDate={selectedDate.toISOString()} />
      </CustomTabPanel>

      <CustomTabPanel tabPanelValue={currentTab.id} value={'few-days'}>
        <TimeRangeInputs range={timeRange} setRange={setTimeRange} />

        <WoodsRangeAmountShipment
          endDate={timeRange.endDate.toISOString()}
          startDate={timeRange.startDate.toISOString()}
        />
      </CustomTabPanel>
    </>
  )
}
