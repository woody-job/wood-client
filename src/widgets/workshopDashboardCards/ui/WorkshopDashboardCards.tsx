import { FC } from 'react'

import { useParams } from 'react-router-dom'

import { Box, Skeleton, Typography } from '@mui/material'

import { EditWorkshopDimensionOfTheDay } from '@/features/workshop/edit-dimension-of-the-day'
import { EditWoodNamingOfTheDay } from '@/features/workshop/edit-wood-naming-of-the-day'
import { useFetchWorkshopDailyStatsQuery } from '@/entities/workshop'
import { DashItem } from '@/shared/ui'

type WorkshopDashboardCardsProps = {
  now: string
}

export const WorkshopDashboardCards: FC<WorkshopDashboardCardsProps> = ({ now }) => {
  const { workshopId } = useParams()
  const { data: workshopDailyData, isLoading: isLoadingWorkshopDailyData } =
    useFetchWorkshopDailyStatsQuery(
      { workshopId: workshopId ? Number(workshopId) : -1, date: now },
      { skip: !workshopId, refetchOnMountOrArgChange: true }
    )

  return (
    <Box display='flex' flexDirection='column' gap={3} width={'100%'}>
      {isLoadingWorkshopDailyData ? (
        <Skeleton sx={{ height: 115 }} variant='rounded' />
      ) : (
        <DashItem sx={{ backgroundColor: theme => theme.primary.purpleOpacity }}>
          <Typography variant='h6'>Сечение дня</Typography>
          <EditWorkshopDimensionOfTheDay
            dimensionOfTheDay={workshopDailyData?.dimensionOfTheDay}
            date={now}
            workshopId={Number(workshopId)}
          />
        </DashItem>
      )}

      {isLoadingWorkshopDailyData ? (
        <Skeleton sx={{ height: 115 }} variant='rounded' />
      ) : (
        <DashItem sx={{ backgroundColor: theme => theme.primary.purple }}>
          <Typography variant='h6'>Условное обозначение дня</Typography>
          <EditWoodNamingOfTheDay
            woodNamingOfTheDay={workshopDailyData?.woodNamingOfTheDay}
            date={now}
            workshopId={Number(workshopId)}
          />
        </DashItem>
      )}
    </Box>
  )
}
