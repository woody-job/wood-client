import { Box, Typography } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import { Fragment } from 'react'
import { DashItem } from '@/shared/ui'
import { paths, settingsPaths } from './Sidebar.constants.ts'

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
        {paths.map(path => (
          <Fragment key={path.name}>
            {'children' in path ? (
              <>
                <DashItem>{path.name}</DashItem>
                {path.children?.map(child => (
                  <NavLink key={child.name} to={child.path}>
                    <DashItem itemVariant='subitem' isActive={location.pathname === child.path}>
                      {child.name}
                    </DashItem>
                  </NavLink>
                ))}
              </>
            ) : (
              <NavLink to={path.path}>
                <DashItem isActive={location.pathname === path.path}>{path.name}</DashItem>
              </NavLink>
            )}
          </Fragment>
        ))}
      </Box>

      <Typography color={theme => theme.black[40]}>Настройки</Typography>

      <Box display='flex' flexDirection='column' gap='2px' mb={5} mt={2}>
        {settingsPaths.map(({ path, name }) => (
          <NavLink to={path} key={name}>
            <DashItem isActive={location.pathname.startsWith(path)}>{name}</DashItem>
          </NavLink>
        ))}
      </Box>
    </Box>
  )
}
