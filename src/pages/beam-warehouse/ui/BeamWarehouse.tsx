import { Box, Typography } from '@mui/material'

import { BeamWarehouseItem } from '@/widgets/beamWarehouseItem'

export type BeamWarehouseTab = { id: string | number }

export const BeamWarehouse = () => {
  return (
    <Box>
      <Typography variant='h5'>Склад сырья</Typography>
      <Box sx={{ mt: 5 }}>
        <BeamWarehouseItem />
      </Box>
    </Box>
  )
}
