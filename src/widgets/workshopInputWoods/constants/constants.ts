import { GridColDef } from '@mui/x-data-grid'

export const WORKSHOP_BEAM_IN_TABLE_COLUMNS: GridColDef[] = [
  { field: 'diameter', headerName: 'Диаметр (м)', width: 100 },
  { field: 'volume', headerName: 'Объем (м3)', width: 130 },
  { field: 'amount', headerName: 'Кол-во', width: 110 },
]
