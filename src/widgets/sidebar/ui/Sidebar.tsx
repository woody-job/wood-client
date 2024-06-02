import { Fragment, useMemo } from 'react'

import { NavLink, useLocation } from 'react-router-dom'

import { Box, Skeleton, Typography } from '@mui/material'

import { useAuth } from '@/entities/auth/index.ts'
import { USER_ROLE } from '@/entities/user/index.ts'
import { useFetchAllWorkshopsQuery } from '@/entities/workshop/api/api.ts'
import { urls } from '@/shared/constants'
import { MenuSidebarItem } from '@/shared/ui'

import { getSidebarPaths } from '../lib/helpers'
import { settingsPaths } from './Sidebar.constants.ts'

export const Sidebar = () => {
  const location = useLocation()

  const { data: workshops, isLoading: isLoadingWorkshops } = useFetchAllWorkshopsQuery()

  const user = useAuth()

  const paths = useMemo(() => {
    return getSidebarPaths(workshops)
  }, [workshops])

  const configuredMenuItems = (
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
  )

  const menuItemsSkeleton = (
    <Box>
      {Array.from(Array(12).keys()).map(() => (
        <Skeleton variant='rectangular' sx={{ my: 3 }} height={'25px'} />
      ))}
    </Box>
  )

  return (
    <Box
      component='aside'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '212px',
        width: '100%',
        height: '100vh',
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
        Учет
        <p style={{ margin: 0 }}>производства</p>
      </Typography>

      {isLoadingWorkshops ? menuItemsSkeleton : configuredMenuItems}

      {user?.role.name === USER_ROLE.SUPERADMIN ? (
        <Box display='flex' flexDirection='column' gap='2px' mb={2} mt={2}>
          <Typography color={theme => theme.black[40]}>Настройки</Typography>

          {settingsPaths.map(
            ({ path, name }) =>
              path && (
                <NavLink to={path} key={name}>
                  <MenuSidebarItem isActive={location.pathname.startsWith(path)}>
                    {name}
                  </MenuSidebarItem>
                </NavLink>
              )
          )}
        </Box>
      ) : (
        <Box />
      )}
    </Box>
  )
}
