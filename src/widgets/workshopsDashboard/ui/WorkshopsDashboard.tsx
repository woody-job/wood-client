import { Box, Grid, Skeleton } from '@mui/material'

import { WorkshopDashItem } from '@/entities/workshop/ui'
import { useFetchCurrentWorkshopsStatsQuery } from '@/entities/workshop-out'
import { DashboardTitle } from '@/shared/ui'

export const WorkshopsDashboard = () => {
  const { data: workshopCurrentStats, isLoading: isLoadingWorkshopCurrentStats } =
    useFetchCurrentWorkshopsStatsQuery()

  return (
    <Box>
      <DashboardTitle>Цеха</DashboardTitle>
      <Grid container spacing={3}>
        {isLoadingWorkshopCurrentStats && (
          <>
            <Grid item xs={12} lg={6} xl={4}>
              <Skeleton sx={{ width: '100%', height: 430 }} variant='rounded' />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <Skeleton sx={{ width: '100%', height: 430 }} variant='rounded' />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <Skeleton sx={{ width: '100%', height: 430 }} variant='rounded' />
            </Grid>
          </>
        )}
        {workshopCurrentStats &&
          workshopCurrentStats.map(workshopCurrentStat => {
            return (
              <Grid item xs={12} lg={6} xl={4}>
                <WorkshopDashItem
                  key={workshopCurrentStat.workshopId}
                  workshopId={workshopCurrentStat.workshopId}
                  workshopName={workshopCurrentStat.workshopName}
                  woods={workshopCurrentStat.woods}
                  lastWorkingDayStats={workshopCurrentStat.lastWorkingDayStats}
                />
              </Grid>
            )
          })}
      </Grid>
    </Box>
  )
}
