import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { CreateDryerButton } from '@/features/dryer/create'
import { UpdateDryerButton } from '@/features/dryer/update'
import { ButtonWithConfirm } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

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
          <UpdateDryerButton sx={{ mr: 1 }}>Редактировать</UpdateDryerButton>
          <ButtonWithConfirm
            header={'Удалить сушильную камеру'}
            description={'Вы точно хотите удалить эту сушильнуюд камеру?'}
            onConfirm={() => {
              console.log('Удалить сушильную камеру')
            }}
          >
            Удалить
          </ButtonWithConfirm>
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
      <CreateDryerButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateDryerButton>

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
