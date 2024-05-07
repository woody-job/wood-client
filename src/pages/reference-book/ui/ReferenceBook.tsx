import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

export const ReferenceBook = () => {
  const columns: GridColDef[] = [
    { field: 'width', headerName: 'Ширина (мм)', width: 200 },
    { field: 'thickness', headerName: 'Толщина (мм)', width: 200 },
    { field: 'height', headerName: 'Длина (м)', width: 200 },
    { field: 'volume', headerName: 'Объем (м3)', width: 200 },
    { field: 'sort', headerName: 'Сорт', width: 200 },
  ]

  const rows = [
    { id: 1, width: 10, thickness: 10, height: 10, sort: 'Первый', volume: 0.0068 },
    { id: 2, width: 20, thickness: 20, height: 20, sort: 'Второй', volume: 0.0068 },
    { id: 3, width: 30, thickness: 30, height: 30, sort: 'Третий', volume: 0.0068 },
    { id: 4, width: 10, thickness: 10, height: 10, sort: 'Первый', volume: 0.0068 },
    { id: 5, width: 20, thickness: 20, height: 20, sort: 'Второй', volume: 0.0068 },
    { id: 6, width: 30, thickness: 30, height: 30, sort: 'Третий', volume: 0.0068 },
    { id: 7, width: 10, thickness: 10, height: 10, sort: 'Первый', volume: 0.0068 },
    { id: 8, width: 20, thickness: 20, height: 20, sort: 'Второй', volume: 0.0068 },
    { id: 9, width: 30, thickness: 30, height: 30, sort: 'Третий', volume: 0.0068 },
  ]

  return (
    <Box>
      <Typography variant='h5'>Справочник</Typography>

      <Box display={'flex'} flexDirection='column' mt={10}>
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
    </Box>
  )
}
