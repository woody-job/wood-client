import { GridColDef } from '@mui/x-data-grid'

export const WAREHOUSE_TABLE_COLUMNS: GridColDef[] = [
  { headerName: 'Сечение', field: 'dimension' },
  { headerName: 'Порода', field: 'woodType', width: 130 },
  { headerName: 'Кол-во', field: 'amount', width: 100 },

  { headerName: 'Сорт первый, м3', field: 'firstClassVolume', width: 130 },
  { headerName: 'Сорт первый, шт', field: 'firstClassAmount', width: 130 },
  { headerName: 'Сорт второй, м3', field: 'secondClassVolume', width: 130 },
  { headerName: 'Сорт второй, шт', field: 'secondClassAmount', width: 130 },
  { headerName: 'Сорт рыночный, м3', field: 'marketClassVolume', width: 160 },
  { headerName: 'Сорт рыночный, шт', field: 'marketClassAmount', width: 160 },
  { headerName: 'Сорт третий, м3', field: 'thirdClassVolume', width: 130 },
  { headerName: 'Сорт третий, шт', field: 'thirdClassAmount', width: 130 },

  { headerName: 'Объем, м3', field: 'totalVolume' },
]
