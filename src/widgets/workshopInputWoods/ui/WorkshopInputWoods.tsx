import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import { AddInputWoodButton } from '@/features/wood-input-woods/add'
import { UpdateInputWoodButton } from '@/features/wood-input-woods/update'
import { ButtonWithConfirm, CustomGridPanel, dataGridStyles } from '@/shared/ui'
import { DataGridContainer, dataGridLocaleText } from '@/shared/ui/data-grid'

export const WorkshopInputWoods = () => {
  const columns: GridColDef[] = [
    { field: 'diameter', headerName: 'Диаметр', width: 100 },
    { field: 'amount', headerName: 'Кол-во', width: 100 },
    { field: 'volume', headerName: 'Объем', width: 100 },
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: () => (
        <Box sx={{ ml: 'auto' }}>
          <UpdateInputWoodButton sx={{ mr: 1 }} />
          <ButtonWithConfirm
            header='Удалить лес на вход'
            description='Вы точно уверены, что хотите удалить лес?'
            onConfirm={() => {
              console.log('delete input wood')
            }}
          >
            Удалить
          </ButtonWithConfirm>
        </Box>
      ),
    },
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
      <Box display='flex' mb={1} pt={5}>
        <Typography>Вход</Typography>
        <AddInputWoodButton sx={{ ml: 'auto' }}>Добавить</AddInputWoodButton>
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
