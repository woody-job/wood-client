import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { Box, Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

export const TimberSortsTable = () => {
  const columns: GridColDef[] = [
    { field: 'width', headerName: 'Ширина (мм)', width: 200 },
    { field: 'thickness', headerName: 'Толщина (мм)', width: 200 },
    { field: 'height', headerName: 'Длина (м)', width: 200 },
    { field: 'sort', headerName: 'Сорт', width: 200 },
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
    { id: 1, width: 10, thickness: 10, height: 10, sort: 'Первый' },
    { id: 2, width: 20, thickness: 20, height: 20, sort: 'Второй' },
    { id: 3, width: 30, thickness: 30, height: 30, sort: 'Третий' },
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
