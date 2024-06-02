import { FC, useMemo } from 'react'

import { skipToken } from '@reduxjs/toolkit/query'

import { Box, Grid, Skeleton } from '@mui/material'

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

  const params = dryWoodCondition
    ? {
        startDate,
        endDate,
        woodConditionId: dryWoodCondition.id,
      }
    : skipToken

  const { data: woodArrivalByRange, isLoading: isLoadingWoodArrival } =
    useFetchWoodArrivalByRangeQuery(params)
  const { data: woodShipmentByRange, isLoading: isLoadingWoodShipment } =
    useFetchWoodShipmentByRangeQuery(params)

  const isLoading = isLoadingWoodArrival || isLoadingWoodConditions || isLoadingWoodShipment
  return (
    <Grid container xs={12} spacing={3} mt={5}>
      {isLoading && (
        <>
          <Grid item lg={6} xl={6}>
            <Skeleton variant='circular' width='500px' height='500px' sx={{ mx: 'auto' }} />
          </Grid>
          <Grid item lg={6} xl={6}>
            <Skeleton variant='circular' width='500px' height='500px' sx={{ mx: 'auto' }} />
          </Grid>
        </>
      )}
      {!isLoading && (
        <>
          {woodArrivalByRange && (
            <Grid item lg={6} xl={6}>
              <VaultItem
                title='Поступило'
                sunburstData={woodArrivalByRange.sunburstData}
                total={woodArrivalByRange.totalVolume}
              />
            </Grid>
          )}
          {woodShipmentByRange && (
            <Grid item lg={6} xl={6}>
              <VaultItem
                title='Отгрузили'
                sunburstData={woodShipmentByRange.sunburstData}
                total={woodShipmentByRange.totalVolume}
              />
            </Grid>
          )}
        </>
      )}
    </Grid>
  )
}
