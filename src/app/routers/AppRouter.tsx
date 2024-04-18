import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {RootLayout} from "@/app/layouts";
import Login from "@/pages/login";
import Admin from "@/pages/admin";
import {AdminUsers} from "@/pages/admin-users";

export const AppRouter = () => {
    const routes = createRoutesFromElements(
        <Route
            path="/"
            element={<RootLayout/>}
        >
            <Route
                path="login"
                element={<Login/>}
            />
            <Route
                path="admin"
                element={<Admin/>}
            >
                <Route
                    path="users"
                    element={<AdminUsers />}
                />
            </Route>
        </Route>
    )

  const appRouterObject = createBrowserRouter(routes)

  return <RouterProvider router={appRouterObject} />
}
