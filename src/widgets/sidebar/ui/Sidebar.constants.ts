import { urls } from '@/shared/constants/urls.ts'

import { SidebarPath } from './Sidebar.types.ts'

export const settingsPaths: SidebarPath[] = [
  {
    path: `/${urls.admin}/${urls.adminUsers}`,
    name: 'Пользователи',
  },
  {
    path: `/${urls.admin}/${urls.systemSettings}`,
    name: 'Настройки системы',
  },
]
