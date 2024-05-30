import { GridColDef } from '@mui/x-data-grid'

export const WORKSHOP_OUT_TABLE_COLUMNS: GridColDef[] = [
  { field: 'dimension', headerName: 'Сечение', width: 125 },
  { field: 'woodClass', headerName: 'Сорт', width: 110 },
  { field: 'woodType', headerName: 'Порода', width: 80 },
  { field: 'amount', headerName: 'Кол-во', width: 70 },
]
