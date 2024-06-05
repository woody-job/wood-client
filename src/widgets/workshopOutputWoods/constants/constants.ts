import { GridColDef } from '@mui/x-data-grid'

import { WorkshopDefaultDimension } from '../types'

export const WORKSHOP_OUT_TABLE_COLUMNS: GridColDef[] = [
  { field: 'dimension', headerName: 'Сечение', width: 125 },
  { field: 'woodClass', headerName: 'Сорт', width: 110 },
  { field: 'woodType', headerName: 'Порода', width: 80 },
  { field: 'amount', headerName: 'Кол-во', width: 70 },
]

// 100х22х2 сорт 1 и 2
// 100х22х3 сорт 1 и 2
// 150х22х6 сорт 1, 2 и рыночный
// 100х22х6 сорт рыночный
// 150х47х6 сорт 1, рыночный и браун
// 200х47х6 сорт 1, рыночный и браун
export const FIRST_WORKSHOP_DEFAULT_DIMENSIONS: WorkshopDefaultDimension[] = [
  {
    width: 100,
    thickness: 22,
    length: 2,
    woodClassesNames: ['Первый', 'Второй'],
  },
  {
    width: 100,
    thickness: 22,
    length: 3,
    woodClassesNames: ['Первый', 'Второй'],
  },
  {
    width: 150,
    thickness: 22,
    length: 6,
    woodClassesNames: ['Первый', 'Второй', 'Рыночный'],
  },
  {
    width: 100,
    thickness: 22,
    length: 6,
    woodClassesNames: ['Рыночный'],
  },
  {
    width: 150,
    thickness: 47,
    length: 6,
    woodClassesNames: ['Первый', 'Рыночный', 'Браун'],
  },
  {
    width: 200,
    thickness: 47,
    length: 6,
    woodClassesNames: ['Первый', 'Рыночный', 'Браун'],
  },
]

// 100х22х2 сорт 1 и 2
// 100х22х3 сорт 1 и 2
// 100х22х4 сорт 1 и 2
export const SECOND_WORKSHOP_DEFAULT_DIMENSIONS: WorkshopDefaultDimension[] = [
  {
    width: 100,
    thickness: 22,
    length: 2,
    woodClassesNames: ['Первый', 'Второй'],
  },
  {
    width: 100,
    thickness: 22,
    length: 3,
    woodClassesNames: ['Первый', 'Второй'],
  },
  {
    width: 100,
    thickness: 22,
    length: 4,
    woodClassesNames: ['Первый', 'Второй'],
  },
]

// 100х22х2 сорт 1 и 2
// 100х22х3 сорт 1 и 2
// 100х22х4 сорт 1 и 2
// 100х22х6 сорт 1, 2 и рыночный
// 150х22х6 сорт 1, 2 и рыночный
export const THIRD_WORKSHOP_DEFAULT_DIMENSIONS: WorkshopDefaultDimension[] = [
  {
    width: 100,
    thickness: 22,
    length: 2,
    woodClassesNames: ['Первый', 'Второй'],
  },
  {
    width: 100,
    thickness: 22,
    length: 3,
    woodClassesNames: ['Первый', 'Второй'],
  },
  {
    width: 100,
    thickness: 22,
    length: 4,
    woodClassesNames: ['Первый', 'Второй'],
  },
  {
    width: 100,
    thickness: 22,
    length: 6,
    woodClassesNames: ['Первый', 'Второй', 'Рыночный'],
  },
  {
    width: 150,
    thickness: 22,
    length: 6,
    woodClassesNames: ['Первый', 'Второй', 'Рыночный'],
  },
]
