import { GridColDef } from '@mui/x-data-grid'

export const DRYER_CONDITION_TABLE_COLUMNS: GridColDef[] = [
  { headerName: 'Цикл', field: 'chamberIterationCountWhenBringingIn', flex: 0.3 },
  { headerName: 'Сечение', field: 'dimension' },
  { headerName: 'Сорт', field: 'woodClass', flex: 0.5 },
  { headerName: 'Порода', field: 'woodType', flex: 0.3 },
  { headerName: 'Количество', field: 'amount', flex: 0.5 },
  { headerName: 'Объем, м3', field: 'volume' },
]

export const DRYERS_INFO_TABLE_COLUMNS: GridColDef[] = [
  { headerName: 'Дата', field: 'date', flex: 0.3 },
  { headerName: 'Сушилка', field: 'dryerChamberName', flex: 0.3 },
  { headerName: 'Цикл', field: 'chamberIterationCountWhenBringingIn', flex: 0.3 },
  { headerName: 'Сечение', field: 'dimension', flex: 0.3 },
  { headerName: 'Сорт', field: 'woodClass', flex: 0.5 },
  { headerName: 'Порода', field: 'woodType', flex: 0.3 },
  { headerName: 'Количество', field: 'amount', flex: 0.5 },
  { headerName: 'Объем, м3', field: 'volume' },
]
