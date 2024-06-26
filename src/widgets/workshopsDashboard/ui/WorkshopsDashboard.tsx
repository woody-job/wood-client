import { Box, Grid } from '@mui/material'

import { useFetchAllWorkshopsQuery } from '@/entities/workshop'
import { WorkshopDashItem } from '@/entities/workshop/ui'
import { DashboardTitle } from '@/shared/ui'

export const WorkshopsDashboard = () => {
  const { data: workshops } = useFetchAllWorkshopsQuery()

  return (
    <Box>
      <DashboardTitle>Цеха</DashboardTitle>
      {workshops &&
        workshops.map(workshop => {
          return (
            <Grid item xs={12}>
              <WorkshopDashItem
                key={workshop.id}
                workshopId={workshop.id}
                workshopName={workshop.name}
              />
            </Grid>
          )
        })}
    </Box>
  )
}
