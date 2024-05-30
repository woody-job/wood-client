import { Box, Skeleton, Typography } from '@mui/material'

import { DashItem, DashboardTitle } from '@/shared/ui'
import { useFetchWarehouseStatsQuery } from '@/entities/warehouse'

export const InfoDashboard = () => {
  const { data: warehouseStats, isLoading: isLoadingWarehouseStats } = useFetchWarehouseStatsQuery()

  return (
    <Box>
      <DashboardTitle>Общие данные по складу</DashboardTitle>
      <Box display='flex' gap={3} flexWrap='wrap'>
        {isLoadingWarehouseStats &&
          Array.from(Array(2)).map(() => {
            return <Skeleton variant='rounded' sx={{ width: 231, height: 182 }} />
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
                flex={'0 0 30%'}
                sx={{
                  '&:nth-child(2n)': {
                    backgroundColor: theme => theme.primary.purpleOpacity,
                  },
                  '&:nth-child(2n+1)': {
                    backgroundColor: theme => theme.primary.blue,
                  },
                }}
              >
                <Box mb={1} key={warehouseStat.woodConditionId}>
                  <Typography fontWeight='bold' variant='subtitle1'>
                    {warehouseStat.woodConditionName}
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
      </Box>
    </Box>
  )
}
