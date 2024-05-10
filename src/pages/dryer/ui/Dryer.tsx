import { Box, Tab, Tabs, Typography } from '@mui/material'

import { InsertWoodButton } from '@/features/dryer/insert-wood'
import { RemoveWoodButton } from '@/features/dryer/remove-wood'
import { DryerConditionItem } from '@/entities/dryer'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { appSearchParams } from '@/shared/constants'

export const Dryer = () => {
  const tabs = [
    { id: 1, name: 'Камера 1' },
    { id: 2, name: 'Камера 2' },
    { id: 3, name: 'Камера 3' },
    { id: 4, name: 'Камера 4' },
    { id: 5, name: 'Камера 5' },
    { id: 6, name: 'Камера 6' },
    { id: 7, name: 'Камера 7' },
  ]

  const { currentTab, handleChangeTab } = useSearchParamsTabs(
    appSearchParams.currentTab,
    tabs,
    tab => tab.id.toString(),
    tabs[0],
  )

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Typography variant="h5" component="h1" mb={3}>
        Состояние сушильных камер
      </Typography>

      <Tabs onChange={handleChangeTab} value={currentTab.id}>
        {tabs.map(tab => (
            <Tab
              key={tab.id}
              label={tab.name}
              value={tab.id}
            />
          ),
        )}
      </Tabs>

      <Box alignSelf="center" mt={4}>
        <DryerConditionItem
          dryerName={currentTab.name}
          actions={
            <>
              <InsertWoodButton>Внести</InsertWoodButton>
              <RemoveWoodButton />
            </>
          }
        />
      </Box>
    </Box>
  )
}
