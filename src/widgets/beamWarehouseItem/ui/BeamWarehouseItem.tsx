import { FC } from 'react'

import { Box, Typography } from '@mui/material'

import { BeamWarehouseTable, useFetchBeamWarehouseQuery } from '@/entities/beam-warehouse'
import { TableFullscreen } from '@/shared/ui'

export const BeamWarehouseItem: FC = () => {
  const { data: beamWarehouse, isLoading: isLoadingBeamWarehouse } = useFetchBeamWarehouseQuery()

  return (
    <Box sx={{ mt: 3 }}>
      <TableFullscreen
        renderTable={props => (
          <BeamWarehouseTable
            {...props}
            beamWarehouseData={beamWarehouse?.data}
            isLoadingBeamWarehouseTableData={isLoadingBeamWarehouse}
          />
        )}
      />
      <Typography sx={{ mt: 1, mb: 2 }}>Всего м3: {beamWarehouse?.totalVolume}</Typography>
    </Box>
  )
}
