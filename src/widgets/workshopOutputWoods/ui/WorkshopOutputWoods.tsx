import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import { AddOutputWoodButton } from '@/features/wood-output-woods/add'
import { UpdateOutputWoodButton } from '@/features/wood-output-woods/update'
import { ButtonWithConfirm } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

export const WorkshopOutputWoods = () => {
  const columns: GridColDef[] = [
    { field: 'dimension', headerName: 'Сечение', width: 75 },
    { field: 'woodClass', headerName: 'Сорт', width: 50 },
    { field: 'woodType', headerName: 'Порода', width: 100 },
    { field: 'amount', headerName: 'Кол-во', width: 50 },
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 300,
      renderCell: () => (
        <>
          <UpdateOutputWoodButton sx={{ mr: 1 }}>Редактировать</UpdateOutputWoodButton>
          <ButtonWithConfirm
            header='Удалить лес на выход'
            description='Вы точно уверены, что хотите удалить лес?'
            onConfirm={() => {
              console.log('delete output wood')
            }}
          >
            Удалить
          </ButtonWithConfirm>
        </>
      ),
    },
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
      <Box display='flex' mb={1} pt={5}>
        <Typography>Выход</Typography>
        <AddOutputWoodButton sx={{ ml: 'auto' }}>Добавить</AddOutputWoodButton>
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
