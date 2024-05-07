import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

export const WorkshopOutputWoods = () => {
  const columns: GridColDef[] = [
    { field: 'dimension', headerName: 'Сечение', width: 100 },
    { field: 'woodClass', headerName: 'Сорт', width: 100 },
    { field: 'woodType', headerName: 'Порода', width: 100 },
    { field: 'amount', headerName: 'Кол-во', width: 100 },
  ]

  const rows = [
    {
      id: 1,
      dimension: '100х100',
      woodClass: '1',
      woodType: 'Сосна',
      amount: 100,
    },
    {
      id: 2,
      dimension: '100х100',
      woodClass: '1',
      woodType: 'Сосна',
      amount: 100,
    },
  ]

  return (
    <Box>
      <Box display='flex' mb={1}>
        <Typography>Выход</Typography>
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
