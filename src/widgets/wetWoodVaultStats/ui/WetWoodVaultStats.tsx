import { FC, useMemo } from 'react'

import { skipToken } from '@reduxjs/toolkit/query'

import { Grid, Skeleton } from '@mui/material'

import { VaultItem } from '@/entities/vault'
import { useFetchWoodArrivalByRangeQuery } from '@/entities/wood-arrival'
import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'
import { useFetchWoodShipmentByRangeQuery } from '@/entities/wood-shipment'
import { useFetchWorkshopProducedStatsQuery } from '@/entities/workshop-out'

export type WetWoodVaultStatsProps = {
  startDate: string
  endDate: string
}

export const WetWoodVaultStats: FC<WetWoodVaultStatsProps> = ({ startDate, endDate }) => {
  const { data: woodConditions, isLoading: isLoadingWoodConditions } =
    useFetchAllWoodConditionsQuery()

  const wetWoodCondition = useMemo(() => {
    return woodConditions?.find(condition => condition.name === 'Сырая')
  }, [woodConditions])

  const { data: workshopProducedStats, isLoading: isLoadingWorkshopProduced } =
    useFetchWorkshopProducedStatsQuery({
      startDate,
      endDate,
    })

  const params = useMemo(
    () =>
      wetWoodCondition
        ? {
            startDate,
            endDate,
            woodConditionId: wetWoodCondition.id,
          }
        : skipToken,
    [startDate, endDate, wetWoodCondition]
  )

  const { data: woodArrivalByRange, isLoading: isLoadingWoodArrival } =
    useFetchWoodArrivalByRangeQuery(params)
  const { data: woodShipmentByRange, isLoading: isLoadingWoodShipment } =
    useFetchWoodShipmentByRangeQuery(params)

  const isLoading =
    isLoadingWorkshopProduced ||
    isLoadingWoodArrival ||
    isLoadingWoodConditions ||
    isLoadingWoodShipment

  return (
    <Grid container xs={12} spacing={3} mt={5} justifyContent={'center'}>
      {isLoading && (
        <>
          <Grid item lg={6} xl={6}>
            <Skeleton variant='circular' width='500px' height='500px' sx={{ mx: 'auto' }} />
          </Grid>
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
          {workshopProducedStats && (
            <Grid item lg={6} xl={6}>
              <VaultItem
                title='Произвели'
                sunburstData={workshopProducedStats.sunburstData}
                total={workshopProducedStats.totalVolume}
              />
            </Grid>
          )}
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
