import { Box, Skeleton } from '@mui/material'

import { WorkshopDashItem } from '@/entities/workshop/ui'
import { useFetchCurrentWorkshopsStatsQuery } from '@/entities/workshop-out'
import { DashboardTitle } from '@/shared/ui'

export const WorkshopsDashboard = () => {
  const { data: workshopCurrentStats, isLoading: isLoadingWorkshopCurrentStats } =
    useFetchCurrentWorkshopsStatsQuery()

  return (
    <Box>
      <DashboardTitle>Цеха</DashboardTitle>
      <Box display='flex' gap={2} flexWrap='wrap' justifyContent='center'>
        {isLoadingWorkshopCurrentStats && (
          <>
            <Skeleton sx={{ width: 500, height: 441 }} variant='rounded' />
            <Skeleton sx={{ width: 500, height: 441 }} variant='rounded' />
            <Skeleton sx={{ width: 500, height: 441 }} variant='rounded' />
          </>
        )}
        {workshopCurrentStats &&
          workshopCurrentStats.map(workshopCurrentStat => {
            return (
              <WorkshopDashItem
                key={workshopCurrentStat.workshopId}
                workshopId={workshopCurrentStat.workshopId}
                workshopName={workshopCurrentStat.workshopName}
                woods={workshopCurrentStat.woods}
                lastWorkingDayStats={workshopCurrentStat.lastWorkingDayStats}
              />
            )
          })}
      </Box>
    </Box>
  )
}
