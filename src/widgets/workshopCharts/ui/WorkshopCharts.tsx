import { Box, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'

import {
  WorkshopWoodsBar,
  WorkshopWoodsDiametersLine,
  WorkshopWoodsTotalLine,
} from '@/entities/workshop'

export const WorkshopCharts = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6} xl={4}>
        <Typography sx={{ mb: 1 }}>Вход</Typography>
        <WorkshopWoodsDiametersLine />
      </Grid>

      <Grid item xs={12} lg={6} xl={4}>
        <Typography sx={{ mb: 1 }}>Выход</Typography>
        <WorkshopWoodsBar />
      </Grid>

      <Grid item xs={12} lg={6} xl={4}>
        <Box display='flex'>
          <Typography>Итог</Typography>

          <RadioGroup
            sx={{
              '&.MuiRadioGroup-root': {
                flexDirection: 'row',
              },
              ml: 'auto',
            }}
          >
            <FormControlLabel
              value='на_куб'
              control={<Radio size='small' />}
              label='На куб'
              sx={{ ml: 'auto', mr: 1 }}
            />
            <FormControlLabel value='всего' control={<Radio size='small' />} label='Всего' />
          </RadioGroup>
        </Box>
        <WorkshopWoodsTotalLine />
      </Grid>
    </Grid>
  )
}
