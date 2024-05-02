import { urls } from '@/shared/constants/urls.ts'
import { SidebarPath } from './Sidebar.types.ts'

export const paths: SidebarPath[] = [
  {
    path: `/${urls.vault}/${urls.dryWoodVault}`,
    name: 'Свод сухой',
  },
  {
    path: `/${urls.vault}/${urls.wetWoodVault}`,
    name: 'Свод сырой',
  },
  {
    path: '/' + urls.arrival,
    name: 'Поступления',
  },
  {
    path: '/' + urls.shipment,
    name: 'Отгрузки',
  },
  {
    name: 'Цеха',
    children: [
      {
        path: `/${urls.workshop}/1`,
        name: 'Цех 1',
      },
      {
        path: `/${urls.workshop}/2`,
        name: 'Цех 2',
      },
    ],
  },
  {
    path: '/' + urls.dryer,
    name: 'Сушилки',
  },
  {
    path: '/' + urls.warehouse,
    name: 'Склад',
  },
  {
    path: '/' + urls.referenceBook,
    name: 'Справочник',
  },
]

export const settingsPaths = [
  {
    path: `/${urls.admin}/${urls.adminUsers}`,
    name: 'Пользователи',
  },
  {
    path: `/${urls.admin}/${urls.systemSettings}`,
    name: 'Найстройки системы',
  },
]
