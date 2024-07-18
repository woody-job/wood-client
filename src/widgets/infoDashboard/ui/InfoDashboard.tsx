import { useNavigate } from 'react-router-dom'

import { Box, darken, Skeleton, Typography } from '@mui/material'

import { useFetchBeamWarehouseStatsQuery } from '@/entities/beam-warehouse'
import { useFetchWarehouseStatsQuery } from '@/entities/warehouse'
import { urls, WOOD_CONDITION } from '@/shared/constants'
import { DashboardTitle, DashItem } from '@/shared/ui'

export const InfoDashboard = () => {
  const { data: warehouseStats, isLoading: isLoadingWarehouseStats } = useFetchWarehouseStatsQuery()
  const { data: beamWarehouseStats, isLoading: isLoadingBeamWarehouseStats } =
    useFetchBeamWarehouseStatsQuery()

  const navigate = useNavigate()

  const handleNavigateToWarehouse = (woodConditionId: number) => {
    if (woodConditionId === WOOD_CONDITION.DRY) {
      navigate(`/${urls.woodWarehouse}?tab=${woodConditionId}`)
    }

    if (woodConditionId === WOOD_CONDITION.WET) {
      navigate(`/${urls.woodWarehouse}?tab=${woodConditionId}`)
    }
  }

  const handleNavigateToBeamWarehouse = () => {
    navigate(`/${urls.beamWarehouse}`)
  }

  return (
    <Box>
      <DashboardTitle>Общие данные по складу</DashboardTitle>
      <Box display='flex' gap={3} flexWrap='wrap'>
        {isLoadingWarehouseStats &&
          Array.from(Array(2)).map(() => {
            return <Skeleton variant='rounded' sx={{ width: 200, height: 182 }} />
          })}

        {warehouseStats &&
          warehouseStats.map(warehouseStat => {
            const sorts = Object.keys(warehouseStat.sorts).map(woodClass => {
              return {
                title: woodClass,
                value: warehouseStat.sorts[woodClass],
              }
            })

            return (
              <DashItem
                sx={{
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  '&:nth-child(2n)': {
                    backgroundColor: theme => theme.primary.purpleOpacity,
                    '&:hover': {
                      backgroundColor: theme => darken(theme.primary.purpleOpacity, 0.04),
                    },
                  },
                  '&:nth-child(2n+1)': {
                    backgroundColor: theme => theme.primary.blue,
                    '&:hover': {
                      backgroundColor: theme => darken(theme.primary.blue, 0.04),
                    },
                  },
                }}
                onClick={() => {
                  handleNavigateToWarehouse(warehouseStat.woodConditionId)
                }}
              >
                <Box mb={1} key={warehouseStat.woodConditionId}>
                  <Typography fontWeight='bold' variant='subtitle1'>
                    {warehouseStat.woodConditionName} доска
                  </Typography>
                  {sorts.length ? (
                    sorts.map(sort => (
                      <Typography key={sort.title}>
                        {sort.title}: {sort.value} м3
                      </Typography>
                    ))
                  ) : (
                    <Typography>Пусто</Typography>
                  )}
                </Box>
              </DashItem>
            )
          })}

        {isLoadingBeamWarehouseStats && (
          <Skeleton variant='rounded' sx={{ width: 160, height: 182 }} />
        )}

        {beamWarehouseStats && (
          <DashItem
            sx={{
              cursor: 'pointer',
              transition: 'background 0.3s ease',
              '&:nth-child(2n)': {
                backgroundColor: theme => theme.primary.purpleOpacity,
                '&:hover': {
                  backgroundColor: theme => darken(theme.primary.purpleOpacity, 0.04),
                },
              },
              '&:nth-child(2n+1)': {
                backgroundColor: theme => theme.primary.blue,
                '&:hover': {
                  backgroundColor: theme => darken(theme.primary.blue, 0.04),
                },
              },
              mr: 2,
            }}
            onClick={() => {
              handleNavigateToBeamWarehouse()
            }}
          >
            <Box mb={1}>
              <Typography fontWeight='bold' variant='subtitle1'>
                Сырье
              </Typography>
              {beamWarehouseStats.length ? (
                beamWarehouseStats.map(woodTypeStat => (
                  <Typography key={woodTypeStat.woodTypeId}>
                    {woodTypeStat.woodTypeName}: {woodTypeStat.totalVolume} м3
                  </Typography>
                ))
              ) : (
                <Typography>Пусто</Typography>
              )}
            </Box>
          </DashItem>
        )}
      </Box>
    </Box>
  )
}
