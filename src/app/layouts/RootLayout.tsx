import {Box, List, ListItemButton, ListItemText} from "@mui/material";
import {NavLink, Outlet} from "react-router-dom";


export const RootLayout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                width: '100%',
            }}
        >
            <Box
                component="aside"
                sx={{
                    maxWidth: '300px',
                    width: '100%',
                    h: '100%',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <List>
                    <ListItemButton>
                        Настройки
                    </ListItemButton>

                    <ListItemButton component={NavLink} to="admin/users" sx={{pl: 4}}>
                        <ListItemText primary="Пользователи"/>
                    </ListItemButton>
                </List>
            </Box>

            <Box component="main" sx={{p: 4}}>
                <Outlet/>
            </Box>
        </Box>
    )
}