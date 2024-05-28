import { Box, Skeleton, Typography } from '@mui/material'

import { CustomSunburst } from '@/shared/ui'
import { FC } from 'react'
import { SunburstData } from '@/entities/workshop-out'

type WorkshopTrashStatsSunburstProps = {
  workshopOutSunburstData: SunburstData
  totalWorkshopOutVolume: number
  isWorkshopOutLoading: boolean
}

export const WorkshopTrashStatsSunburst: FC<WorkshopTrashStatsSunburstProps> = ({
  workshopOutSunburstData,
  totalWorkshopOutVolume,
  isWorkshopOutLoading,
}) => {
  const data = {
    name: 'Дата',
    children: workshopOutSunburstData,
  }

  if (isWorkshopOutLoading) {
    return (
      <Box
        sx={{
          display: 'grid',
          placeContent: 'center',
          width: '100%',
          height: '100%',
          marginTop: 3,
        }}
      >
        <Skeleton variant='circular' sx={{ width: '400px', height: '400px', ml: 'auto' }} />
      </Box>
    )
  }

  return (
    <CustomSunburst
      data={data}
      id='name'
      value='size'
      valueFormat={value => `${value.toFixed(2)} м3`}
      arcLabel={({ path, value, percentage }) => {
        return path[1] === 'Выход'
          ? `${path[0]}, ${value.toFixed(2)} м3`
          : `${path[0]}: ${percentage.toFixed(2)}%`
      }}
      containerProps={{
        width: '100%',
        ml: 'auto',
      }}
    >
      <Typography>Всего на выходе м3:</Typography>
      <Typography variant='h6'>{totalWorkshopOutVolume.toFixed(2)}</Typography>
    </CustomSunburst>
  )
}
