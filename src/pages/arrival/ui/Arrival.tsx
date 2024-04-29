import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'
import { TimeRangeInputs } from '@/shared/ui/time-range'
import { WoodsDayAmount } from '@/widgets/woodsDayAmount'
import { WoodsRangeAmount } from '@/widgets/woodsRangeAmount'
import { Input, Tab, Tabs, Typography } from '@mui/material'

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
        <Input type='date' value={today} />

        <WoodsDayAmount />
      </CustomTabPanel>

      <CustomTabPanel tabPanelValue={currentTab.id} value={'few-days'}>
        <TimeRangeInputs />

        <WoodsRangeAmount />
      </CustomTabPanel>
    </>
  )
}
