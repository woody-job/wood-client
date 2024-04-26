import { Box, Typography } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import { Fragment } from 'react'
import { MenuSidebarItem } from '@/shared/ui'
import { paths, settingsPaths } from './Sidebar.constants.ts'
import { urls } from '@/shared/constants'
import { ModeSwitchButton } from '@/features/mode-switch'

export const Sidebar = () => {
  const location = useLocation()

  return (
    <Box
      component='aside'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '212px',
        width: '100%',
        height: '100%',
        p: '16px',
        borderRight: '1px solid',
        borderLeft: '1px solid',
        overflow: 'auto',
        borderColor: theme => theme.black[10],
      }}
    >
      <Typography
        variant='subtitle1'
        color={theme => theme.black[80]}
        fontWeight='bold'
        textAlign='right'
      >
        Woody
      </Typography>

      <Box
        display='flex'
        flexDirection='column'
        gap='2px'
        my={2}
        flexGrow='1'
        justifyContent='center'
      >
        <Box component={NavLink} to={urls.dashboard} mb={3}>
          <MenuSidebarItem isActive={location.pathname === `/${urls.dashboard}`}>
            Статистика
          </MenuSidebarItem>
        </Box>

        {paths.map(path => (
          <Fragment key={path.name}>
            {'children' in path ? (
              <>
                <MenuSidebarItem>{path.name}</MenuSidebarItem>
                {path.children?.map(child => (
                  <NavLink key={child.name} to={child.path}>
                    <MenuSidebarItem
                      itemVariant='subitem'
                      isActive={location.pathname === child.path}
                    >
                      {child.name}
                    </MenuSidebarItem>
                  </NavLink>
                ))}
              </>
            ) : (
              <NavLink to={path.path}>
                <MenuSidebarItem isActive={location.pathname === path.path}>
                  {path.name}
                </MenuSidebarItem>
              </NavLink>
            )}
          </Fragment>
        ))}
      </Box>

      <Typography color={theme => theme.black[40]}>Настройки</Typography>

      <Box display='flex' flexDirection='column' gap='2px' mb={2} mt={2}>
        {settingsPaths.map(({ path, name }) => (
          <NavLink to={path} key={name}>
            <MenuSidebarItem isActive={location.pathname.startsWith(path)}>{name}</MenuSidebarItem>
          </NavLink>
        ))}
        <ModeSwitchButton variant='outlined' size='small' sx={{ mt: 5, alignSelf: 'flex-end' }} />
      </Box>
    </Box>
  )
}
