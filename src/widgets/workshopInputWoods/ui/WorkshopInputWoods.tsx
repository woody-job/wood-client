import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import { CustomGridPanel, dataGridStyles } from '@/shared/ui'
import { DataGridContainer, dataGridLocaleText } from '@/shared/ui/data-grid'

export const WorkshopInputWoods = () => {
  const columns: GridColDef[] = [
    { field: 'diameter', headerName: 'Диаметр', width: 120 },
    { field: 'amount', headerName: 'Кол-во', width: 120 },
    { field: 'volume', headerName: 'Объем', width: 120 },
  ]

  const rows = [
    {
      id: 1,
      amount: 10,
      volume: 100,
      diameter: 100,
    },
    {
      id: 2,
      amount: 10,
      volume: 100,
      diameter: 100,
    },
  ]

  return (
    <Box>
      <Box display='flex' mb={1}>
        <Typography>Вход</Typography>
        <Button size='small' sx={{ ml: 'auto' }}>
          Добавить
        </Button>
      </Box>
      <DataGridContainer height={400}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          disableMultipleRowSelection
          localeText={dataGridLocaleText}
          sx={dataGridStyles}
          hideFooter
          slots={{ panel: CustomGridPanel }}
        />
      </DataGridContainer>
      <Typography sx={{ mt: 3 }}>Всего м3: 68.06</Typography>
    </Box>
  )
}
