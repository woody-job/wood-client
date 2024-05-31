import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { RootLayout } from '@/app/layouts'
import Admin from '@/pages/admin'
import AdminUsers from '@/pages/admin-users'
import Arrival from '@/pages/arrival'
import Dashboard from '@/pages/dashboard'
import Dryer from '@/pages/dryer'
import { RouteError } from '@/pages/error'
import Login from '@/pages/login'
import { NotFound } from '@/pages/not-found'
import ReferenceBook from '@/pages/reference-book'
import Shipment from '@/pages/shipment'
import SystemSettings from '@/pages/system-settings'
import SettingsReferenceBook from '@/pages/system-settings/reference-book'
import SettingsDryers from '@/pages/system-settings/settings-dryers'
import WoodNamings from '@/pages/system-settings/wood-namings'
import Workshops from '@/pages/system-settings/workshops'
import DryWoodVault from '@/pages/vault/dry-wood'
import WetWoodVault from '@/pages/vault/wet-wood'
import { Warehouse } from '@/pages/warehouse/ui/Warehouse'
import WorkshopItem from '@/pages/workshop-item'
import { PrivatePage, useAuth } from '@/entities/auth'
import { urls } from '@/shared/constants'
import { USER_ROLE } from '@/entities/user'

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
          <Route path={urls.arrival} element={<Arrival />} />
          <Route path={urls.shipment} element={<Shipment />} />
          <Route path={urls.warehouse} element={<Warehouse />} />
          <Route path={urls.dashboard} element={<Dashboard />} />

          {systemSettingsRoutes}

          <Route path={urls.referenceBook} element={<ReferenceBook />} />
          <Route path={urls.dryer} element={<Dryer />} />

          <Route path={urls.vault} element={<Outlet />}>
            <Route path={urls.dryWoodVault} element={<DryWoodVault />} />
            <Route path={urls.wetWoodVault} element={<WetWoodVault />} />
          </Route>

          <Route path={urls.workshop + '/:workshopId'} element={<WorkshopItem />} />

          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    </>
  )

  const appRouterObject = createBrowserRouter(routes)

  return <RouterProvider router={appRouterObject} />
}
