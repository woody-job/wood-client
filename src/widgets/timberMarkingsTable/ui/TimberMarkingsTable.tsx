import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { Box, Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

export const TimberMarkingsTable = () => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Название', width: 200 },
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
    { id: 1, name: 'Елка' },
    { id: 2, name: 'Сосна' },
    { id: 3, name: 'Береза' },
    { id: 4, name: 'Дуб' },
    { id: 5, name: 'Лиственница' },
    { id: 6, name: 'Ясень' },
    { id: 7, name: 'Клен' },
    { id: 8, name: 'Бук' },
    { id: 9, name: 'Вяз' },
    { id: 10, name: 'Ольха' },
    { id: 11, name: 'Рябина' },
    { id: 12, name: 'Осина' },
    { id: 13, name: 'Липа' },
    { id: 14, name: 'Черемуха' },
    { id: 15, name: 'Каштан' },
    { id: 16, name: 'Тополь' },
    { id: 17, name: 'Ива' },
    { id: 18, name: 'Пихта' },
    { id: 19, name: 'Кедр' },
    { id: 20, name: 'Можжевельник' },
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
