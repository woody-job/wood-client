import { ChangeEventHandler, useState } from 'react'

import { Input, Tab, Tabs, Typography } from '@mui/material'

import { WoodsDayAmountArrival } from '@/widgets/woodsDayAmountArrival'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'
import { TimeRangeInputs, TimeRangeState } from '@/shared/ui/time-range'

import { WoodsRangeAmountArrival } from '../../../widgets/woodsRangeAmountArrival'

export const Arrival = () => {
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

  const today = new Date().toISOString().split('T')[0]

  const [selectedDate, setSelectedDate] = useState(() => today)
  const [timeRange, setTimeRange] = useState<TimeRangeState>({ startDate: today, endDate: today })

  const handleDateChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSelectedDate(e.target.value)
  }

  return (
    <>
      <Typography variant='h5' sx={{ mb: 5 }}>
        Поступления
      </Typography>
      <Tabs value={currentTab.id} onChange={handleChangeTab} sx={{ mt: 5 }}>
        {tabs.map(tab => (
          <Tab key={tab.name} label={tab.name} value={tab.id} />
        ))}
      </Tabs>

      <CustomTabPanel tabPanelValue={currentTab.id} value={'day'}>
        <Input type='date' value={selectedDate} onChange={handleDateChange} />

        <WoodsDayAmountArrival selectedDate={selectedDate} />
      </CustomTabPanel>

      <CustomTabPanel tabPanelValue={currentTab.id} value={'few-days'}>
        <TimeRangeInputs range={timeRange} setRange={setTimeRange} />

        <WoodsRangeAmountArrival endDate={timeRange.endDate} startDate={timeRange.startDate} />
      </CustomTabPanel>
    </>
  )
}
