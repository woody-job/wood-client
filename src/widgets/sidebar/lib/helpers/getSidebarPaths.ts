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
      name: 'Поступления',
      children: [
        {
          name: 'Сырье',
          path: `${urls.beamArrival}/${urls.day}`,
        },
        {
          name: 'Доска',
          path: `${urls.woodArrival}/${urls.day}`,
        },
      ],
    },
    {
      name: 'Отгрузки',
      children: [
        {
          name: 'Сырье',
          path: `${urls.beamShipment}/${urls.day}`,
        },
        {
          name: 'Доска',
          path: `${urls.woodShipment}/${urls.day}`,
        },
      ],
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
      name: 'Склад',
      children: [
        {
          name: 'Сырье',
          path: '/' + urls.beamWarehouse,
        },
        {
          name: 'Доска',
          path: '/' + urls.woodWarehouse,
        },
      ],
    },
    {
      path: '/' + urls.referenceBook,
      name: 'Справочник',
    },
  ] as SidebarPath[]
}
