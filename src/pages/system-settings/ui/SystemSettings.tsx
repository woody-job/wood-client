import { appSearchParams, systemSettingsTabs } from '@/shared/constants'
import { tabIndexProps } from '@/shared/libs/helpers'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'
import { TimberMarkingsTable } from '@/widgets/timberMarkingsTable'
import { Box, Tab, Tabs } from '@mui/material'
import { DryersTable } from '@/widgets/dryersTable'

export const SystemSettings = () => {
  const { currentTab, handleChangeTab } = useSearchParamsTabs(
    appSearchParams.currentTab,
    systemSettingsTabs
  )

  return (
    <Box>
      <Tabs value={currentTab} onChange={handleChangeTab}>
        <Tab label='Параметры цехов' {...tabIndexProps(systemSettingsTabs.WORKSHOP_PARAMETERS)} />
        <Tab label='Обозначения леса' {...tabIndexProps(systemSettingsTabs.TIMBER_MARKINGS)} />
        <Tab label='Справочник' {...tabIndexProps(systemSettingsTabs.REFERENCE_BOOK)} />
        <Tab label='Сушилки' {...tabIndexProps(systemSettingsTabs.DRYERS)} />
      </Tabs>

      <CustomTabPanel
        value={currentTab}
        index={systemSettingsTabs.WORKSHOP_PARAMETERS}
      ></CustomTabPanel>

      <CustomTabPanel value={currentTab} index={systemSettingsTabs.TIMBER_MARKINGS}>
        <TimberMarkingsTable />
      </CustomTabPanel>

      <CustomTabPanel value={currentTab} index={systemSettingsTabs.REFERENCE_BOOK}></CustomTabPanel>

      <CustomTabPanel value={currentTab} index={systemSettingsTabs.DRYERS}>
        <DryersTable />
      </CustomTabPanel>
    </Box>
  )
}
