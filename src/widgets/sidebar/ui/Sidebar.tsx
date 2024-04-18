import { tokens } from '@/shared/constants/tokens'
import { Box, Button, Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
  const paths = [
    {
      path: 'admin/users',
      name: 'Пользователи',
    },
    {
      path: 'admin/settings',
      name: 'Найстройки системы',
    },
  ]

  return (
    <Box
      component='aside'
      sx={{
        diplay: 'flex',
        flexDirection: 'column',
        maxWidth: '212px',
        width: '100%',
        h: '100%',
        p: '16px',
        borderRight: '1px solid',
        borderColor: tokens.black[10],
      }}
    >
      <Typography color={tokens.black[40]}>Настройки</Typography>

      <Box display='flex' flexDirection='column' gap='2px' my={2}>
        {paths.map(({ path, name }) => (
          <Button
            component={NavLink}
            to={path}
            variant='text'
            size='small'
            sx={{
              width: '100%',
              py: '5px',
              '&.active': {
                backgroundColor: tokens.black[5],
              },
            }}
          >
            {name}
          </Button>
        ))}
      </Box>

      <Divider />
    </Box>
  )
}
