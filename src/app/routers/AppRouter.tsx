import { RootLayout } from '@/app/layouts'
import Admin from '@/pages/admin'
import AdminUsers from '@/pages/admin-users'
import Dryer from '@/pages/dryer'
import { RouteError } from '@/pages/error'
import Login from '@/pages/login'
import { NotFound } from '@/pages/not-found'
import SystemSettings from '@/pages/system-settings'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

export const AppRouter = () => {
  const routes = createRoutesFromElements(
    <Route path='/' errorElement={<RouteError />} element={<RootLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='admin' element={<Admin />}>
        <Route path='users' element={<AdminUsers />} />
        <Route path='system-settings' element={<SystemSettings />} />
      </Route>
      <Route path='dryer' element={<Dryer />} />

      <Route path='*' element={<NotFound />} />
    </Route>
  )

  const appRouterObject = createBrowserRouter(routes)

  return <RouterProvider router={appRouterObject} />
}
