import { Box, Tab, Tabs, Typography } from '@mui/material'

import { InsertWoodButton } from '@/features/dryer/insert-wood'
import { RemoveWoodButton } from '@/features/dryer/remove-wood'
import { useAuth } from '@/entities/auth'
import { DryerActionsProps, DryerConditionItem, useFetchAllDryersQuery } from '@/entities/dryer'
import { DryersInfo } from '@/entities/dryer/ui/DryersInfo'
import { USER_ROLE } from '@/entities/user'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'

export const Dryer = () => {
  const { data: dryers, isLoading: isLoadingAllDryers } = useFetchAllDryersQuery()

  const user = useAuth()

  const isAdmin = user?.role.name === USER_ROLE.SUPERADMIN || user?.role.name === USER_ROLE.ADMIN

  const tabs = dryers
    ? [...dryers, { id: 0, name: 'Вход в сушилки', chamberIterationCount: 0 }]
    : undefined

  const { currentTab, handleChangeTab } = useSearchParamsTabs(
    appSearchParams.currentTab,
    tabs,
    tab => tab?.id.toString(),
    dryers?.[0]
  )

  return (
    <Box display='flex' flexDirection='column' width='100%'>
      <Typography variant='h5' component='h1' mb={3}>
        Состояние сушильных камер
      </Typography>

      <Tabs onChange={handleChangeTab} value={currentTab?.id}>
        {isLoadingAllDryers && <Tab label='Загрузка...' disabled />}
        {tabs?.map(tab => <Tab key={tab.id} label={tab.name} value={tab.id} />)}
      </Tabs>

      {currentTab && currentTab.name !== 'Вход в сушилки' && (
        <Box mt={4}>
          <DryerConditionItem
            key={currentTab.id}
            dryerId={currentTab.id}
            dryerName={currentTab.name}
            dryerIterationCount={currentTab.chamberIterationCount}
            actions={({ dryerData }: DryerActionsProps) => {
              return isAdmin ? (
                <>
                  <InsertWoodButton dryerId={currentTab.id}>Внести</InsertWoodButton>
                  <RemoveWoodButton dryerData={dryerData} dryerId={currentTab.id} />
                </>
              ) : (
                <></>
              )
            }}
          />
        </Box>
      )}

      {currentTab && currentTab.name === 'Вход в сушилки' && (
        <Box mt={4}>
          <DryersInfo />
        </Box>
      )}
    </Box>
  )
}
