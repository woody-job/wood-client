import { urls } from '@/shared/constants/urls.ts'
import { SidebarPath } from './Sidebar.types.ts'

export const paths: SidebarPath[] = [
  {
    path: '',
    name: 'Свод сухой',
  },
  {
    path: '',
    name: 'Свод сырой',
  },
  {
    path: '',
    name: 'Поступления',
  },
  {
    name: 'Цеха',
    children: [
      {
        path: '',
        name: 'Цех 1',
      },
      {
        path: '',
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
