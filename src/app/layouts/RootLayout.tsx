import {Box, Link, List, ListItem} from "@mui/material";
import {NavLink, Outlet} from "react-router-dom";


export const RootLayout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Box
                component="aside"
                sx={{
                    maxWidth: '300px',
                    width: '100%'
                }}
            >
                <List>
                    <ListItem>
                        <Link component={NavLink} to='/admin'>Настройки</Link>
                    </ListItem>
                </List>
            </Box>

            <Box component="main">
                <Outlet/>
            </Box>
        </Box>
    )
}