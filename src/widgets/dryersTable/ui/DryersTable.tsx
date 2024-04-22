import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { Box, Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

export const DryersTable = () => {
  const columns: GridColDef[] = [
    { field: 'dryerName', headerName: 'Название', width: 200 },
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 300,
      renderCell: () => (
        <>
          <Button size='small' variant='gray' sx={{ mr: 1 }}>
            Редактировать
          </Button>
          <Button size='small' variant='contained'>
            Удалить
          </Button>
        </>
      ),
    },
  ]

  const rows = [
    { id: 1, dryerName: 'Сушильная камера 1' },
    { id: 2, dryerName: 'Сушильная камера 2' },
    { id: 3, dryerName: 'Сушильная камера 3' },
    { id: 4, dryerName: 'Сушильная камера 4' },
    { id: 5, dryerName: 'Сушильная камера 5' },
    { id: 6, dryerName: 'Сушильная камера 6' },
  ]

  return (
    <Box display={'flex'} flexDirection='column'>
      <Button variant='gray' sx={{ my: 4, alignSelf: 'end' }}>
        Добавить
      </Button>

      <DataGridContainer>
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
    </Box>
  )
}
