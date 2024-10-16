import { GridColDef } from '@mui/x-data-grid'

export const WAREHOUSE_TABLE_COLUMNS: GridColDef[] = [
  { headerName: 'Сечение', field: 'dimension' },
  { headerName: 'Порода', field: 'woodType', flex: 0.25 },
  { headerName: 'Кол-во', field: 'amount', flex: 0.12 },

  { headerName: 'Сорт первый, м3', field: 'firstClassVolume', flex: 0.25 },
  { headerName: 'Сорт второй, м3', field: 'secondClassVolume', flex: 0.25 },
  { headerName: 'Сорт рыночный, м3', field: 'marketClassVolume', flex: 0.2 },
  { headerName: 'Сорт третий, м3', field: 'thirdClassVolume', flex: 0.3 },

  { headerName: 'Объем, м3', field: 'totalVolume' },
]
