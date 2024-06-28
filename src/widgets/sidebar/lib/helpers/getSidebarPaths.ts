import { Workshop } from '@/entities/workshop/model'
import { urls } from '@/shared/constants'

import { SidebarPath } from '../../ui/Sidebar.types'

export const getSidebarPaths = (workshops: Workshop[] | undefined): SidebarPath[] => {
  const workshopPaths: SidebarPath[] = workshops
    ? workshops.map(workshop => {
        return {
          path: `${urls.workshop}/${workshop.id}/${urls.day}`,
          name: workshop.name,
        }
      })
    : []

  return [
    {
      path: `${urls.arrival}/${urls.day}`,
      name: 'Поступления',
    },
    {
      path: `${urls.shipment}/${urls.day}`,
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
