import { GridColDef } from '@mui/x-data-grid'

export const WORKSHOP_TOTAL_TABLE_COLUMNS: GridColDef[] = [
  // Общая информация
  { headerName: 'Дата', field: 'date' },
  { headerName: 'Лес', field: 'woodNaming' },
  { headerName: 'Сечение', field: 'dimension' },

  // Общий вход/выход
  { headerName: 'Вход, м3', field: 'totalBeamInVolume' },
  { headerName: 'Выход, %', field: 'totalWorkshopOutPercentage' },

  // Сорта
  { headerName: 'Сорт первый, м3', field: 'firstClassVolume' },
  { headerName: 'Сорт первый, %', field: 'firstClassPercentage' },

  { headerName: 'Сорт второй, м3', field: 'secondClassVolume' },
  { headerName: 'Сорт второй, %', field: 'secondClassPercentage' },

  { headerName: 'Сорт рыночный, м3', field: 'marketClassVolume' },
  { headerName: 'Сорт рыночный, %', field: 'marketClassPercentage' },

  { headerName: 'Сорт браун, м3', field: 'brownClassVolume' },
  { headerName: 'Сорт браун, %', field: 'brownClassPercentage' },
  // Сорта

  // Дэньги
  { headerName: 'Выручка, ₽', field: 'totalWoodPrice' },
  { headerName: 'Сырье, ₽', field: 'priceOfRawMaterials' },
  { headerName: 'Распиловка, ₽', field: 'sawingPrice' },
  { headerName: 'Итог, ₽', field: 'profit' },
  { headerName: 'Итог на куб, ₽', field: 'profitPerUnit' },
]
