import { urls } from '@/shared/constants'
import { Box, Tab, Tabs } from '@mui/material'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const SystemSettings = () => {
  const location = useLocation()
  const lastNestedPath = location.pathname.split('/').pop()

  const navigate = useNavigate()

  useEffect(() => {
    if (lastNestedPath !== urls.systemSettings) return
    navigate(urls.workshops)
  }, [])

  return (
    <Box>
      <Tabs value={lastNestedPath}>
        <Tab
          component={NavLink}
          to={urls.workshops}
          value={urls.workshops}
          label='Параметры цехов'
        />
        <Tab component={NavLink} to={urls.timbers} label='Обозначения леса' value={urls.timbers} />
        <Tab
          component={NavLink}
          to={urls.referenceBook}
          label='Справочник'
          value={urls.referenceBook}
        />
        <Tab component={NavLink} to={urls.dryers} label='Сушилки' value={urls.dryers} />
      </Tabs>

      <Outlet />
    </Box>
  )
}
