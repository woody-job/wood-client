import { useNavigate } from 'react-router-dom'

import { Box, darken, Grid, Skeleton, Typography } from '@mui/material'

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
    <Box mr={2}>
      <Box>
        {isLoadingBeamWarehouseStats && (
          <Grid container spacing={2}>
            {Array.from(Array(3)).map(() => {
              return (
                <Grid item xs={6}>
                  <Skeleton variant='rounded' sx={{ width: '100%', height: 182 }} />
                </Grid>
              )
            })}
          </Grid>
        )}

        {beamWarehouseStats && (
          <Box mb={2}>
            <DashboardTitle>Сырье</DashboardTitle>
            <Grid container flexWrap='wrap' spacing={2}>
              {beamWarehouseStats.length ? (
                beamWarehouseStats.map(woodTypeStat => (
                  <Grid
                    sx={{
                      cursor: 'pointer',
                      transition: 'background 0.3s ease',
                      '&:nth-child(2n) > div': {
                        backgroundColor: theme => theme.primary.purpleOpacity,
                        '&:hover': {
                          backgroundColor: theme => darken(theme.primary.purpleOpacity, 0.04),
                        },
                      },
                      '&:nth-child(2n+1) > div': {
                        backgroundColor: theme => theme.primary.blue,
                        '&:hover': {
                          backgroundColor: theme => darken(theme.primary.blue, 0.04),
                        },
                      },
                    }}
                    item
                    key={woodTypeStat.woodTypeId}
                    xs={6}
                  >
                    <DashItem
                      onClick={() => {
                        handleNavigateToBeamWarehouse()
                      }}
                    >
                      <Typography fontWeight='bold'>{woodTypeStat.woodTypeName}:</Typography>
                      <Typography>Баланс: {woodTypeStat.balanceVolume} м3</Typography>
                      <Typography>Пиловочник: {woodTypeStat.sawingVolume} м3</Typography>
                      <Typography mt={1}>
                        Всего:{' '}
                        {Number(
                          (woodTypeStat.balanceVolume + woodTypeStat.sawingVolume).toFixed(4)
                        )}{' '}
                        м3
                      </Typography>
                    </DashItem>
                  </Grid>
                ))
              ) : (
                <Typography>Пусто</Typography>
              )}
            </Grid>
          </Box>
        )}

        {isLoadingWarehouseStats && (
          <Grid container spacing={2} mt={1}>
            {Array.from(Array(2)).map(() => {
              return (
                <Grid item xs={6}>
                  <Skeleton variant='rounded' sx={{ width: '100%', height: 182 }} />
                </Grid>
              )
            })}
          </Grid>
        )}

        {warehouseStats && (
          <Box>
            <DashboardTitle>Доска</DashboardTitle>

            <Grid container flexWrap='wrap' spacing={2}>
              {warehouseStats.map(warehouseStat => {
                const sorts = Object.keys(warehouseStat.sorts).map(woodClass => {
                  return {
                    title: woodClass,
                    value: warehouseStat.sorts[woodClass],
                  }
                })

                return (
                  <Grid
                    item
                    xs={6}
                    sx={{
                      cursor: 'pointer',
                      transition: 'background 0.3s ease',
                      '&:nth-child(2n) > div': {
                        backgroundColor: theme => theme.primary.purpleOpacity,
                        '&:hover': {
                          backgroundColor: theme => darken(theme.primary.purpleOpacity, 0.04),
                        },
                      },
                      '&:nth-child(2n+1) > div': {
                        backgroundColor: theme => theme.primary.blue,
                        '&:hover': {
                          backgroundColor: theme => darken(theme.primary.blue, 0.04),
                        },
                      },
                    }}
                  >
                    <DashItem
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

                        <Typography mt={1}>
                          Всего: {Number(warehouseStat.totalVolume.toFixed(4))} м3
                        </Typography>
                      </Box>
                    </DashItem>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  )
}
