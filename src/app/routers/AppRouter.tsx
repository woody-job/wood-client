import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { RouteError } from '@/pages/error'
import { RootLayout } from '@/app/layouts'
import { NotFound } from '@/pages/not-found'

import Admin from '@/pages/admin'
import AdminUsers from '@/pages/admin-users'
import Dryer from '@/pages/dryer'
import Login from '@/pages/login'
import SystemSettings from '@/pages/system-settings'
import Workshops from '@/pages/system-settings/workshops'
import Timbers from '@/pages/system-settings/timbers'
import ReferenceBook from '@/pages/system-settings/reference-book'
import SettingsDryers from '@/pages/system-settings/settings-dryers'
import Dashboard from '@/pages/dashboard'
import { urls } from '@/shared/constants'

export const AppRouter = () => {
  const routes = createRoutesFromElements(
    <Route path='/' errorElement={<RouteError />} element={<RootLayout />}>
      <Route path={urls.dashboard} element={<Dashboard />} />
      <Route path={urls.login} element={<Login />} />
      <Route path={urls.admin} element={<Admin />}>
        <Route path={urls.adminUsers} element={<AdminUsers />} />

        <Route path={urls.systemSettings} element={<SystemSettings />}>
          <Route path={urls.workshops} element={<Workshops />} />
          <Route path={urls.timbers} element={<Timbers />} />
          <Route path={urls.referenceBook} element={<ReferenceBook />} />
          <Route path={urls.dryers} element={<SettingsDryers />} />
        </Route>
      </Route>
      <Route path={urls.dryer} element={<Dryer />} />

      <Route path='*' element={<NotFound />} />
    </Route>
  )

  const appRouterObject = createBrowserRouter(routes)

  return <RouterProvider router={appRouterObject} />
}
