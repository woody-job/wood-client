import { FC } from 'react'

import { Box, Grid, Typography } from '@mui/material'

type TableTotalInfoProps = {
  totalVolume?: number
  totalAmount?: number
}

export const TableTotalInfo: FC<TableTotalInfoProps> = ({ totalVolume, totalAmount }) => {
  return (
    <Grid container justifyContent={'flex-end'} sx={{ mt: 0.5, mb: 2 }}>
      <Box>
        <Grid container>
          <Typography>
            Итого м3:{' '}
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
              {totalVolume ?? 0}
            </Typography>
          </Typography>
          <Typography sx={{ ml: 3 }}>
            Итого шт:{' '}
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
              {totalAmount ?? 0}
            </Typography>
          </Typography>
        </Grid>
      </Box>
    </Grid>
  )
}
