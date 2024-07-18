import { GridColDef } from '@mui/x-data-grid'

export const WORKSHOP_BEAM_IN_TABLE_COLUMNS: GridColDef[] = [
  { field: 'woodNaming', headerName: 'Условное обозначение', flex: 1 },
  { field: 'diameter', headerName: 'Диаметр, см', flex: 0.5 },
  { field: 'volume', headerName: 'Объем, м3', flex: 0.5 },
  { field: 'amount', headerName: 'Кол-во', flex: 0.5 },
]
