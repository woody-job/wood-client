import { FC } from 'react'

import { Box, Grid, Typography } from '@mui/material'

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

      <Grid container justifyContent={'flex-end'} sx={{ mt: 0.5, mb: 2 }}>
        <Box>
          <Grid container>
            <Typography>
              Итого м3:{' '}
              <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                {beamWarehouse?.totalVolume ?? 0}
              </Typography>
            </Typography>
          </Grid>
        </Box>
      </Grid>
    </Box>
  )
}
