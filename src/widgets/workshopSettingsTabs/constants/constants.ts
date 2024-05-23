import { GridColDef } from '@mui/x-data-grid'

export const WORKSHOP_WOOD_PRICES_TABLE_COLUMNS: GridColDef[] = [
  { field: 'dimension', headerName: 'Сечение', width: 200 },
  { field: 'woodClass', headerName: 'Сорт', width: 200 },
  { field: 'price', headerName: 'Цена (₽)', width: 200 },
]
