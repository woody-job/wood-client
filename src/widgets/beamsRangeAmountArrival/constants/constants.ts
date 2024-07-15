import { GridColDef } from '@mui/x-data-grid'

export const BEAM_SHIPMENT_TIME_RANGE_TABLE_COLUMNS: GridColDef[] = [
  { headerName: 'Дата', field: 'date' },
  { field: 'supplier', headerName: 'Поставщик', width: 200 },
  { field: 'deliveryMethod', headerName: 'Способ доставки', width: 200 },
  { field: 'woodNaming', headerName: 'Условное обозначение', width: 200 },
  { field: 'woodType', headerName: 'Порода', width: 200 },
  { field: 'amount', headerName: 'Кол-во', width: 200 },
  { field: 'diameter', headerName: 'Диаметр, см', width: 200 },
  { field: 'volume', headerName: 'Объем, м3', width: 200 },
]
