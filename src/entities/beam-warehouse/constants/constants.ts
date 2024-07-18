import { GridColDef } from '@mui/x-data-grid'

export const BEAM_WAREHOUSE_TABLE_COLUMNS: GridColDef[] = [
  { headerName: 'Условное обозначение', field: 'woodNaming', flex: 1 },
  { headerName: 'Диаметр', field: 'diameter', flex: 1 },
  { headerName: 'Кол-во', field: 'amount', flex: 1 },
  { headerName: 'Объем, м3', field: 'volume', flex: 1 },
]
