import { useState } from 'react'

import { Box, Tab, Tabs, Typography } from '@mui/material'

import { WoodsDayAmountArrival } from '@/widgets/woodsDayAmountArrival'
import { WoodsRangeAmountArrival } from '@/widgets/woodsRangeAmountArrival'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'
import { DatePicker } from '@/shared/ui/date-picker'
import { TimeRangeInputs } from '@/shared/ui/time-range'

import dayjs, { Dayjs } from 'dayjs'

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

  const [selectedDate, setSelectedDate] = useState(() => dayjs().subtract(1, 'day'))
  const [timeRange, setTimeRange] = useState({
    startDate: dayjs().subtract(2, 'day'),
    endDate: dayjs().subtract(1, 'day'),
  })

  const handleAccept = (value: Dayjs | null) => {
    value && setSelectedDate(value)
  }

  return (
    <>
      <Box px={1.5} mb={1}>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          Поступления
        </Typography>
        <Tabs value={currentTab.id} onChange={handleChangeTab}>
          {tabs.map(tab => (
            <Tab key={tab.name} label={tab.name} value={tab.id} />
          ))}
        </Tabs>
      </Box>

      <CustomTabPanel tabPanelValue={currentTab.id} value={'day'}>
        <DatePicker value={selectedDate} onAccept={handleAccept} sx={{ maxWidth: 'fit-content' }} />

        <WoodsDayAmountArrival selectedDate={selectedDate.toISOString()} />
      </CustomTabPanel>

      <CustomTabPanel tabPanelValue={currentTab.id} value={'few-days'}>
        <TimeRangeInputs range={timeRange} setRange={setTimeRange} />

        <WoodsRangeAmountArrival
          endDate={timeRange.endDate.toISOString()}
          startDate={timeRange.startDate.toISOString()}
        />
      </CustomTabPanel>
    </>
  )
}
