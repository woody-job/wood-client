import { GridColDef } from '@mui/x-data-grid'

export const BEAM_WAREHOUSE_TABLE_COLUMNS: GridColDef[] = [
  { headerName: 'Условное обозначение', field: 'woodNaming', width: 200 },
  { headerName: 'Объем, м3', field: 'volume', width: 200 },
]
