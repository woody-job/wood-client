import { useNavigate } from 'react-router-dom'

import { Box, darken, Grid, Skeleton, Typography } from '@mui/material'

import { useFetchDryerStatsQuery } from '@/entities/dryer'
import { urls } from '@/shared/constants'
import { DashboardTitle, DashItem } from '@/shared/ui'

export const DryersDashboard = () => {
  const { data: dryerStats, isLoading: isLoadingDryerStats } = useFetchDryerStatsQuery()

  const navigate = useNavigate()

  const handleNavigateToDryer = (dryerId: number) => {
    navigate(`/${urls.dryer}?tab=${dryerId}`)
  }

  return (
    <Box>
      {isLoadingDryerStats && <Skeleton variant='rounded' sx={{ width: '100%', height: 378 }} />}

      {dryerStats && (
        <Box>
          <DashboardTitle>Общие данные по сушилкам</DashboardTitle>

          <Grid container spacing={2} flexWrap='wrap' justifyContent='flex-start'>
            {dryerStats.map(dryerStat => {
              const sorts = Object.keys(dryerStat.sorts)
                .filter(woodClass => {
                  return dryerStat.sorts[woodClass] !== 0
                })
                .map(woodClass => {
                  return {
                    title: woodClass,
                    value: dryerStat.sorts[woodClass],
                  }
                })

              return (
                <Grid
                  item
                  xs={4}
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
                      handleNavigateToDryer(dryerStat.dryerId)
                    }}
                  >
                    <Box mb={1} key={dryerStat.dryerId}>
                      <Typography fontWeight='bold' variant='subtitle1'>
                        {dryerStat.dryerName}
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
                </Grid>
              )
            })}
          </Grid>
        </Box>
      )}
    </Box>
  )
}
