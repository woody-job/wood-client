import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'
import { UpdateSectionPriceButton } from '@/features/section/update-price'

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
      renderCell: () => <UpdateSectionPriceButton>Редактировать</UpdateSectionPriceButton>,
    },
  ]

  const rows = [
    { id: 1, section: '150x150x5', sort: 'Первый', price: '15 000 руб.' },
    { id: 2, section: '150x150x5', sort: 'Второй', price: '15 000 руб.' },
    { id: 3, section: '150x150x5', sort: 'Третий', price: '15 000 руб.' },
  ]

  return (
    <Box display={'flex'} flexDirection='column'>
      <DataGridContainer mt={4}>
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
