import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { RootLayout } from '@/app/layouts'
import Admin from '@/pages/admin'
import AdminUsers from '@/pages/admin-users'
import Arrival from '@/pages/arrival'
import ArrivalDayInfo from '@/pages/arrival-day-info'
import ArrivalTimeRangeInfo from '@/pages/arrival-time-range-info'
import BeamShipment from '@/pages/beam-shipment'
import BeamShipmentDayInfo from '@/pages/beam-shipment-day-info'
import Dashboard from '@/pages/dashboard'
import Dryer from '@/pages/dryer'
import { RouteError } from '@/pages/error'
import Login from '@/pages/login'
import { NotFound } from '@/pages/not-found'
import ReferenceBook from '@/pages/reference-book'
import Shipment from '@/pages/shipment'
import ShipmentDayInfo from '@/pages/shipment-day-info'
import ShipmentTimeRangeInfo from '@/pages/shipment-time-range-info'
import SystemSettings from '@/pages/system-settings'
import Buyers from '@/pages/system-settings/buyers'
import { DeletePage } from '@/pages/system-settings/delete/ui/DeletePage'
import PersonsInCharge from '@/pages/system-settings/personsInCharge'
import SettingsReferenceBook from '@/pages/system-settings/reference-book'
import SettingsDryers from '@/pages/system-settings/settings-dryers'
import Suppliers from '@/pages/system-settings/suppliers'
import WoodNamings from '@/pages/system-settings/wood-namings'
import Workshops from '@/pages/system-settings/workshops'
import { Warehouse } from '@/pages/warehouse/ui/Warehouse'
import WorkshopDayInfo from '@/pages/workshop-day-info'
import WorkshopItem from '@/pages/workshop-item'
import WorkshopTimeRangeInfo from '@/pages/workshop-time-range-info'
import { PrivatePage, useAuth } from '@/entities/auth'
import { USER_ROLE } from '@/entities/user'
import { urls } from '@/shared/constants'

export const AppRouter = () => {
  const user = useAuth()

  const systemSettingsRoutes =
    user?.role.name === USER_ROLE.SUPERADMIN ? (
      <Route path={urls.admin} element={<Admin />}>
        <Route path={urls.adminUsers} element={<AdminUsers />} />

        <Route path={urls.systemSettings} element={<SystemSettings />}>
          <Route path={urls.workshops} element={<Workshops />} />
          <Route path={urls.woodNamings} element={<WoodNamings />} />
          <Route path={urls.referenceBook} element={<SettingsReferenceBook />} />
          <Route path={urls.dryers} element={<SettingsDryers />} />
          <Route path={urls.suppliers} element={<Suppliers />} />
          <Route path={urls.buyers} element={<Buyers />} />
          <Route path={urls.personsInCharge} element={<PersonsInCharge />} />
          <Route path={urls.delete} element={<DeletePage />} />
        </Route>
      </Route>
    ) : (
      <></>
    )

  const routes = createRoutesFromElements(
    <>
      <Route path={`/${urls.login}`} errorElement={<RouteError />} element={<Login />} />
      <Route element={<PrivatePage />}>
        <Route path='/' errorElement={<RouteError />} element={<RootLayout />}>
          <Route path={urls.woodArrival} element={<Arrival />}>
            <Route path={urls.day} element={<ArrivalDayInfo />} />
            <Route path={urls.timeRange} element={<ArrivalTimeRangeInfo />} />
          </Route>

          <Route path={urls.woodShipment} element={<Shipment />}>
            <Route path={urls.day} element={<ShipmentDayInfo />} />
            <Route path={urls.timeRange} element={<ShipmentTimeRangeInfo />} />
          </Route>

          <Route path={urls.beamShipment} element={<BeamShipment />}>
            <Route path={urls.day} element={<BeamShipmentDayInfo />} />
            {/* <Route path={urls.timeRange} element={<BeamShipmentTimeRangeInfo />} /> */}
          </Route>

          <Route path={urls.woodWarehouse} element={<Warehouse />} />
          <Route path={urls.dashboard} element={<Dashboard />} />

          {systemSettingsRoutes}

          <Route path={urls.referenceBook} element={<ReferenceBook />} />
          <Route path={urls.dryer} element={<Dryer />} />

          <Route path={urls.workshop + '/:workshopId'} element={<WorkshopItem />}>
            <Route path={urls.day} element={<WorkshopDayInfo />} />
            <Route path={urls.timeRange} element={<WorkshopTimeRangeInfo />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    </>
  )

  const appRouterObject = createBrowserRouter(routes, { basename: '/wood-client' })

  return <RouterProvider router={appRouterObject} />
}
