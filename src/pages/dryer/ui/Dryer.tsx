import { skipToken } from '@reduxjs/toolkit/query'

import { Box, Tab, Tabs, Typography } from '@mui/material'

import { InsertWoodButton } from '@/features/dryer/insert-wood'
import { RemoveWoodButton } from '@/features/dryer/remove-wood'
import {
  DryerConditionItem,
  useFetchAllDryersQuery,
  useFetchDryerDataByIdQuery,
} from '@/entities/dryer'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'

export const Dryer = () => {
  const { data: dryers, isLoading: isLoadingAllDryers } = useFetchAllDryersQuery()

  const { currentTab, handleChangeTab } = useSearchParamsTabs(
    appSearchParams.currentTab,
    dryers,
    tab => tab?.id.toString(),
    dryers?.[0]
  )

  const { data: dryerData, isLoading: isDryerDataLoading } = useFetchDryerDataByIdQuery(
    currentTab?.id ?? skipToken
  )

  return (
    <Box display='flex' flexDirection='column' width='100%'>
      <Typography variant='h5' component='h1' mb={3}>
        Состояние сушильных камер
      </Typography>

      <Tabs onChange={handleChangeTab} value={currentTab?.id}>
        {isLoadingAllDryers && <Tab label='Загрузка...' disabled />}
        {dryers && dryers?.map(tab => <Tab key={tab.id} label={tab.name} value={tab.id} />)}
      </Tabs>

      {currentTab && (
        <Box alignSelf='center' mt={4}>
          <DryerConditionItem
            key={currentTab.id}
            isLoadingDryerData={isDryerDataLoading}
            dryerData={dryerData}
            dryerName={currentTab.name}
            actions={
              <>
                <InsertWoodButton dryerId={currentTab.id}>Внести</InsertWoodButton>
                <RemoveWoodButton dryerId={currentTab.id} />
              </>
            }
          />
        </Box>
      )}
    </Box>
  )
}
