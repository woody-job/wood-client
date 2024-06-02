import { ChangeEvent, FC, useState } from 'react'

import { Box, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'

import {
  WorkshopWoodsBar,
  WorkshopWoodsDiametersLine,
  WorkshopWoodsTotalLine,
} from '@/entities/workshop'
import { TimeRange } from '@/shared/types'

type WorkshopChartsProps = {
  timeRange: TimeRange
}

export const WorkshopCharts: FC<WorkshopChartsProps> = ({ timeRange }) => {
  const [unitSelection, setUnitSelection] = useState('perTotal')

  const handleUnitSelectionChange = (_event: ChangeEvent<HTMLInputElement>, value: string) => {
    setUnitSelection(value)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6} xl={4}>
        <Typography sx={{ mb: 1 }}>Вход</Typography>
        <WorkshopWoodsDiametersLine timeRange={timeRange} />
      </Grid>

      <Grid item xs={12} lg={6} xl={4}>
        <Typography sx={{ mb: 1 }}>Выход</Typography>
        <WorkshopWoodsBar timeRange={timeRange} />
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
            value={unitSelection}
            onChange={handleUnitSelectionChange}
          >
            <FormControlLabel
              value='perUnit'
              control={<Radio size='small' />}
              label='На куб'
              sx={{ ml: 'auto', mr: 1 }}
            />
            <FormControlLabel value='perTotal' control={<Radio size='small' />} label='Всего' />
          </RadioGroup>
        </Box>
        <WorkshopWoodsTotalLine timeRange={timeRange} unitSelection={unitSelection} />
      </Grid>
    </Grid>
  )
}
