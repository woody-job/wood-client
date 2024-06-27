import { GridColDef } from '@mui/x-data-grid'

export const DRYER_TABLE_CONDITION_TABLE_COLUMNS: GridColDef[] = [
  { headerName: 'Сечение', field: 'dimension' },
  { headerName: 'Сорт', field: 'woodClass', flex: 0.5 },
  { headerName: 'Порода', field: 'woodType', flex: 0.3 },
  { headerName: 'Количество', field: 'amount', flex: 0.5 },
  { headerName: 'Объем', field: 'volume' },
]
