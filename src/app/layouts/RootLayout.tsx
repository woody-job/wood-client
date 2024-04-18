import { Sidebar } from '@/widgets/sidebar'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
      }}
    >
      <Sidebar />

      <Box component='main' sx={{ p: 4, flexGrow: 1, height: '100%' }} overflow='auto'>
        <Outlet />
      </Box>
    </Box>
  )
}
