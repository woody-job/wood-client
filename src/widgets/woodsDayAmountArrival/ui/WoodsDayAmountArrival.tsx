import { FC, useEffect, useState } from 'react'

import { Box, Skeleton, Tab, Tabs } from '@mui/material'

import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'
import { CustomTabPanel } from '@/shared/ui'

import { WoodArrivalByDay } from './WoodArrivalByDay.tsx'

export type WoodsDayAmountArrivalProps = {
  selectedDate: string
}

export const WoodsDayAmountArrival: FC<WoodsDayAmountArrivalProps> = ({ selectedDate }) => {
  const { data: woodConditions, isLoading: isLoadingWoodConditions } =
    useFetchAllWoodConditionsQuery()

  const [currentTab, setCurrentTab] = useState<string | undefined>()

  useEffect(() => {
    if (!woodConditions) {
      return
    }

    setCurrentTab(woodConditions[0].id.toString())
  }, [woodConditions])

  return (
    <Box>
      <Tabs
        value={currentTab}
        onChange={(_, newValue) => {
          setCurrentTab(newValue.toString())
        }}
        sx={{ mt: 5 }}
      >
        {isLoadingWoodConditions && (
          <Box display='flex' gap={1}>
            <Skeleton width='100px' height='40px' />
            <Skeleton width='100px' height='40px' />
            <Skeleton width='100px' height='40px' />
          </Box>
        )}
        {woodConditions &&
          woodConditions.map(woodCondition => (
            <Tab
              key={woodCondition.id}
              label={woodCondition.name}
              value={woodCondition.id.toString()}
            />
          ))}
      </Tabs>

      <Box>
        {currentTab &&
          woodConditions?.map(woodCondition => {
            return (
              <CustomTabPanel
                key={woodCondition.id}
                tabPanelValue={currentTab.toString()}
                value={woodCondition.id.toString()}
              >
                <WoodArrivalByDay
                  key={woodCondition.id}
                  woodConditionId={woodCondition.id}
                  selectedDate={selectedDate}
                />
              </CustomTabPanel>
            )
          })}
      </Box>
    </Box>
  )
}
