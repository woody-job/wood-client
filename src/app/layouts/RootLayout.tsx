import { Sidebar } from '@/widgets/sidebar'
import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        paddingLeft: '0!important',
        paddingRight: '0!important',
      }}
      maxWidth='xl'
    >
      <Sidebar />

      <Box component='main' sx={{ p: 4, flexGrow: 1, height: '100%' }} overflow='auto'>
        <Outlet />
      </Box>
    </Container>
  )
}
