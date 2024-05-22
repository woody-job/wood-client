import { GridColDef } from '@mui/x-data-grid'

export const DIMENSIONS_TABLE_COLUMNS: GridColDef[] = [
  { field: 'width', headerName: 'Ширина (мм)', width: 200 },
  { field: 'thickness', headerName: 'Толщина (мм)', width: 200 },
  { field: 'length', headerName: 'Длина (м)', width: 200 },
  { field: 'woodClass', headerName: 'Сорт', width: 200 },
]
