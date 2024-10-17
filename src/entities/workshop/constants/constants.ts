import { GridColDef } from '@mui/x-data-grid'

export const WORKSHOP_TOTAL_TABLE_COLUMNS: GridColDef[] = [
  // Общая информация
  { headerName: 'Дата', field: 'date' },
  { headerName: 'Лес', field: 'woodNaming' },
  { headerName: 'Сечение', field: 'dimension' },

  // Общий вход/выход
  { headerName: 'Вход, м3', field: 'totalBeamInVolume' },
  { headerName: 'Вход, шт', field: 'totalBeamInAmount' },
  { headerName: 'Выход, м3', field: 'totalWorkshopOutVolume' },
  { headerName: 'Выход, шт', field: 'totalWorkshopOutAmount' },
  { headerName: 'Выход, %', field: 'totalWorkshopOutPercentage' },

  // Сорта
  { headerName: 'Сорт первый, м3', field: 'firstClassVolume', width: 130 },
  { headerName: 'Сорт первый, шт', field: 'firstClassAmount', width: 130 },
  { headerName: 'Сорт первый, %', field: 'firstClassPercentage', width: 130 },

  { headerName: 'Сорт второй, м3', field: 'secondClassVolume', width: 130 },
  { headerName: 'Сорт второй, шт', field: 'secondClassAmount', width: 130 },
  { headerName: 'Сорт второй, %', field: 'secondClassPercentage', width: 130 },

  { headerName: 'Сорт рыночный, м3', field: 'marketClassVolume', width: 150 },
  { headerName: 'Сорт рыночный, шт', field: 'marketClassAmount', width: 150 },
  { headerName: 'Сорт рыночный, %', field: 'marketClassPercentage', width: 150 },

  { headerName: 'Сорт третий, м3', field: 'thirdClassVolume', width: 130 },
  { headerName: 'Сорт третий, шт', field: 'thirdClassAmount', width: 130 },
  { headerName: 'Сорт третий, %', field: 'thirdClassPercentage', width: 130 },
  // Сорта

  // Дэньги
  { headerName: 'Выручка, ₽', field: 'totalWoodPrice' },
  { headerName: 'Сырье, ₽', field: 'priceOfRawMaterials' },
  { headerName: 'Распиловка, ₽', field: 'sawingPrice', width: 130 },
  { headerName: 'Итог, ₽', field: 'profit' },
  { headerName: 'Итог на куб, ₽', field: 'profitPerUnit', width: 130 },
]
