import { GridColDef } from '@mui/x-data-grid'

import { WorkshopDefaultDimension } from '../types'

export const WORKSHOP_OUT_TABLE_COLUMNS: GridColDef[] = [
  { field: 'dimension', headerName: 'Сечение', flex: 0.5 },
  { field: 'woodClass', headerName: 'Сорт', flex: 0.5 },
  { field: 'woodType', headerName: 'Порода', flex: 0.5 },
  { field: 'volume', headerName: 'Объем, м3', flex: 0.5 },
  { field: 'amount', headerName: 'Кол-во', flex: 0.5 },
]

// На 25.06.24
// 100х22х2 сорт 1 хвоя и сорт 2 хвоя
// 100х22х3 сорт 1 хвоя и сорт 2 хвоя
// 150х22х6 сорт 1 ель, сорт 2 хвоя и рыночный хвоя
// 100х22х6 сорт рыночный хвоя и сорт 2 хвоя
// 150х47х6 сорт 1 ель, сорт 1 сосна, рыночный хвоя и браун хвоя
// 200х47х6 сорт 1 ель, сорт 1 сосна, рыночный хвоя и браун хвоя
export const FIRST_WORKSHOP_DEFAULT_DIMENSIONS: WorkshopDefaultDimension[] = [
  {
    width: 100,
    thickness: 22,
    length: 2,
    woodParams: {
      Первый: ['Хвоя'],
      Второй: ['Хвоя'],
    },
  },
  {
    width: 100,
    thickness: 22,
    length: 3,
    woodParams: {
      Первый: ['Хвоя'],
      Второй: ['Хвоя'],
    },
  },
  {
    width: 150,
    thickness: 22,
    length: 6,
    woodParams: {
      Первый: ['Ель'],
      Второй: ['Хвоя'],
      Рыночный: ['Хвоя'],
    },
  },
  {
    width: 100,
    thickness: 22,
    length: 6,
    woodParams: {
      Второй: ['Хвоя'],
      Рыночный: ['Хвоя'],
    },
  },
  {
    width: 150,
    thickness: 47,
    length: 6,
    woodParams: {
      Первый: ['Ель', 'Сосна'],
      Рыночный: ['Хвоя'],
      Браун: ['Хвоя'],
    },
  },
  {
    width: 200,
    thickness: 47,
    length: 6,
    woodParams: {
      Первый: ['Ель', 'Сосна'],
      Рыночный: ['Хвоя'],
      Браун: ['Хвоя'],
    },
  },
]

// На 25.06.24
// 100х22х2 сорт 1 ель и сосна, сорт 2 хвоя
// 100х22х3 сорт 1 ель и сосна, сорт 2 хвоя
// 100х22х4 сорт 1 ель и сосна и сорт 2 хвоя
export const SECOND_WORKSHOP_DEFAULT_DIMENSIONS: WorkshopDefaultDimension[] = [
  {
    width: 100,
    thickness: 22,
    length: 2,
    woodParams: {
      Первый: ['Хвоя'],
      Второй: ['Хвоя'],
    },
  },
  {
    width: 100,
    thickness: 22,
    length: 3,
    woodParams: {
      Первый: ['Хвоя'],
      Второй: ['Хвоя'],
    },
  },
  {
    width: 100,
    thickness: 22,
    length: 4,
    woodParams: {
      Первый: ['Хвоя'],
      Второй: ['Хвоя'],
    },
  },
]

// На 25.06.24
// 100х22х2 сорт 1 хвоя и сорт 2 хвоя
// 100х22х3 сорт 1 хвоя и сорт 2 хвоя
// 100х22х4 сорт 1 хвоя и сорт 2 хвоя
// 100х22х6 сорт 1 ель и сорт 1 сосна, сорт 2 хвоя и сорт рыночный хвоя
// 150х22х6 сорт 1 ель и сорт 1 сосна, сорт 2 хвоя и рыночный хвоя
// 150/47/6 сорт 1 ель и сорт 1 сосна, сорт 2 хвоя, рыночный хвоя
export const THIRD_WORKSHOP_DEFAULT_DIMENSIONS: WorkshopDefaultDimension[] = [
  {
    width: 100,
    thickness: 22,
    length: 2,
    woodParams: {
      Первый: ['Хвоя'],
      Второй: ['Хвоя'],
    },
  },
  {
    width: 100,
    thickness: 22,
    length: 3,
    woodParams: {
      Первый: ['Хвоя'],
      Второй: ['Хвоя'],
    },
  },
  {
    width: 100,
    thickness: 22,
    length: 4,
    woodParams: {
      Первый: ['Хвоя'],
      Второй: ['Хвоя'],
    },
  },
  {
    width: 100,
    thickness: 22,
    length: 6,
    woodParams: {
      Первый: ['Ель', 'Сосна'],
      Второй: ['Хвоя'],
      Рыночный: ['Хвоя'],
    },
  },
  {
    width: 150,
    thickness: 22,
    length: 6,
    woodParams: {
      Первый: ['Ель', 'Сосна'],
      Второй: ['Хвоя'],
      Рыночный: ['Хвоя'],
    },
  },
]
