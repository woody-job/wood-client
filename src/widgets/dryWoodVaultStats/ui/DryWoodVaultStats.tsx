import { FC, useMemo } from 'react'

import { skipToken } from '@reduxjs/toolkit/query'

import { Box, Skeleton } from '@mui/material'

import { VaultItem } from '@/entities/vault'
import { useFetchWoodArrivalByRangeQuery } from '@/entities/wood-arrival'
import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'
import { useFetchWoodShipmentByRangeQuery } from '@/entities/wood-shipment'

export type DryWoodVaultStatsProps = {
  startDate: string
  endDate: string
}

export const DryWoodVaultStats: FC<DryWoodVaultStatsProps> = ({ startDate, endDate }) => {
  const { data: woodConditions, isLoading: isLoadingWoodConditions } =
    useFetchAllWoodConditionsQuery()

  const dryWoodCondition = useMemo(() => {
    return woodConditions?.find(condition => condition.name === 'Сухая')
  }, [woodConditions])

  const { data: woodArrivalByRange, isLoading: isLoadingWoodArrival } =
    useFetchWoodArrivalByRangeQuery(
      dryWoodCondition
        ? {
            startDate,
            endDate,
            woodConditionId: dryWoodCondition.id,
          }
        : skipToken
    )
  const { data: woodShipmentByRange, isLoading: isLoadingWoodShipment } =
    useFetchWoodShipmentByRangeQuery(
      dryWoodCondition
        ? {
            startDate,
            endDate,
            woodConditionId: dryWoodCondition.id,
          }
        : skipToken
    )

  const isLoading = isLoadingWoodArrival || isLoadingWoodConditions || isLoadingWoodShipment
  return (
    <Box display='flex' gap={3} mt={5} flexWrap='wrap' justifyContent='space-evenly'>
      {isLoading && (
        <>
          <Skeleton variant='circular' width='700px' height='700px' />
          <Skeleton variant='circular' width='700px' height='700px' />
          <Skeleton variant='circular' width='700px' height='700px' />
        </>
      )}
      {woodArrivalByRange && (
        <VaultItem title='Поступило' sunburstData={woodArrivalByRange.sunburstData} />
      )}
      {woodShipmentByRange && (
        <VaultItem title='Отгрузили' sunburstData={woodShipmentByRange.sunburstData} />
      )}
    </Box>
  )
}
