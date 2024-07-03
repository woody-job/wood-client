import { GridColDef } from '@mui/x-data-grid'

export const WOOD_ARRIVAL_TIME_RANGE_TABLE_COLUMNS: GridColDef[] = [
  { headerName: 'Дата', field: 'date' },
  { headerName: 'Поставщик', field: 'supplier', flex: 1 },
  { headerName: 'Машина', field: 'car', flex: 1 },
  { headerName: 'Сечение', field: 'dimension', flex: 1 },
  { headerName: 'Сорт', field: 'woodClass', flex: 1 },
  { headerName: 'Порода', field: 'woodType', flex: 1 },
  { headerName: 'Количество', field: 'amount', flex: 1 },
  { headerName: 'Объем, м3', field: 'volume', flex: 1 },
  { headerName: 'Состояние доски', field: 'woodCondition', flex: 1 },
]
