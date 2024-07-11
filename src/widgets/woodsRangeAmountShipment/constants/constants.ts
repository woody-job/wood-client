import { GridColDef } from '@mui/x-data-grid'

export const WOOD_SHIPMENT_TIME_RANGE_TABLE_COLUMNS: GridColDef[] = [
  { headerName: 'Дата', field: 'date' },
  { headerName: 'Покупатель', field: 'buyer', width: 130 },
  { headerName: 'Ответственный', field: 'personInCharge', width: 130 },
  { headerName: 'Машина', field: 'car', width: 170 },
  { headerName: 'Сечение', field: 'dimension', width: 130 },
  { headerName: 'Сечение для продажи', field: 'dimensionForSale', width: 170 },
  { headerName: 'Сорт', field: 'woodClass', width: 130 },
  { headerName: 'Порода', field: 'woodType', width: 130 },
  { headerName: 'Количество', field: 'amount', width: 130 },
  { headerName: 'Объем, м3', field: 'volume', width: 130 },
  { headerName: 'Состояние доски', field: 'woodCondition', width: 130 },
]
