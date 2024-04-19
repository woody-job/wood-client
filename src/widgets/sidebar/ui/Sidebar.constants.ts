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
    path: '',
    name: 'Сушилка',
  },
  {
    path: '',
    name: 'Склад',
  },
  {
    path: '',
    name: 'Справочник',
  },
]

export const settingsPaths = [
  {
    path: '/admin/users',
    name: 'Пользователи',
  },
  {
    path: '/admin/settings',
    name: 'Найстройки системы',
  },
]
