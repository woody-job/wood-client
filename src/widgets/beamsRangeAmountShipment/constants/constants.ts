import { GridColDef } from '@mui/x-data-grid'

export const BEAM_SHIPMENT_TIME_RANGE_TABLE_COLUMNS: GridColDef[] = [
  { headerName: 'Дата', field: 'date' },
  { field: 'buyer', headerName: 'Покупатель', flex: 0.5 },
  { field: 'woodNaming', headerName: 'Условное обозначение', flex: 0.5 },
  { field: 'woodType', headerName: 'Порода', flex: 0.5 },
  { field: 'amount', headerName: 'Кол-во', flex: 0.5 },
  { field: 'diameter', headerName: 'Диаметр, см', flex: 0.5 },
  { field: 'volume', headerName: 'Объем, м3', flex: 0.5 },
]
