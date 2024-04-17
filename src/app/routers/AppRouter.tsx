import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {RootLayout} from "@/app/layouts";
import Login from "@/pages/login";
import Admin from "@/pages/admin";

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
            />
        </Route>
    )

    const appRouterObject = createBrowserRouter(routes)

    return (
        <RouterProvider router={appRouterObject}/>
    )
}

