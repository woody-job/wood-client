import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { Box, Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'

export interface WorkshopTableProps {
  workshopsId: number
}

export const WorkshopTable: FC<WorkshopTableProps> = () => {
  const columns: GridColDef[] = [
    { field: 'section', headerName: 'Сечение', width: 200 },
    { field: 'sort', headerName: 'Сорт', width: 200 },
    { field: 'price', headerName: 'Цена', width: 200 },
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
        </>
      ),
    },
  ]

  const rows = [
    { id: 1, section: '150x150x5', sort: 'Первый', price: '15 000 руб.' },
    { id: 2, section: '150x150x5', sort: 'Второй', price: '15 000 руб.' },
    { id: 3, section: '150x150x5', sort: 'Третий', price: '15 000 руб.' },
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
