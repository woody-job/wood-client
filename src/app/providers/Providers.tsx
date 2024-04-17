import {Provider} from "react-redux";
import {store} from "@/app/store";
import {FC, ReactNode} from "react";
import {AppRouter} from "@/app/routers";
import {ThemeProvider} from "@mui/material";
import {theme} from "@/app/theme";

export interface ProviderProps {
    children?: ReactNode
}

export const Providers: FC<ProviderProps> = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <AppRouter/>
                {children}
            </Provider>
        </ThemeProvider>
    )
}