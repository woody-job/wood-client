import { Workshop } from '@/entities/workshop/model'
import { urls } from '@/shared/constants'

import { SidebarPath } from '../../ui/Sidebar.types'

export const getSidebarPaths = (workshops: Workshop[] | undefined): SidebarPath[] => {
  const workshopPaths: SidebarPath[] = workshops
    ? workshops.map(workshop => {
        return {
          path: `${urls.workshop}/${workshop.id}`,
          name: workshop.name,
        }
      })
    : []

  return [
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
      children: workshopPaths,
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
  ] as SidebarPath[]
}
