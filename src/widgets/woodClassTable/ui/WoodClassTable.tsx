import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { CreateDimensionButton } from '@/features/dimensions/create'
import { UpdateDimensionParamsButton } from '@/features/dimensions/update-params'
import { ButtonWithConfirm } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

export const WoodClassTable = () => {
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
          <UpdateDimensionParamsButton sx={{ mr: 1 }}>Редактировать</UpdateDimensionParamsButton>
          <ButtonWithConfirm
            header='Удалить сечение?'
            description='Вы точно хотите удалить это сечение?'
            onConfirm={() => {
              console.log('Удалить сечение')
            }}
          >
            Удалить
          </ButtonWithConfirm>
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
      <CreateDimensionButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateDimensionButton>

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
