import { useEffect } from 'react'

import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Box, Tab, Tabs } from '@mui/material'

import { urls } from '@/shared/constants'

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
        <Tab
          component={NavLink}
          to={urls.woodNamings}
          label='Обозначения леса'
          value={urls.woodNamings}
        />
        <Tab
          component={NavLink}
          to={urls.referenceBook}
          label='Справочник'
          value={urls.referenceBook}
        />
        <Tab component={NavLink} to={urls.dryers} label='Сушилки' value={urls.dryers} />
        <Tab component={NavLink} to={urls.delete} label='Стереть данные' value={urls.delete} />
      </Tabs>

      <Outlet />
    </Box>
  )
}
