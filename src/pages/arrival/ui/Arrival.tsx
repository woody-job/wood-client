import { SyntheticEvent, useEffect, useState } from 'react'

import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Box, Tab, Tabs, Typography } from '@mui/material'

export const Arrival = () => {
  const tabs = [
    { id: 'day', name: 'За день' },
    { id: 'time-range', name: 'За несколько дней' },
  ]

  const location = useLocation()
  const navigate = useNavigate()

  const isDay = location.pathname.includes('day')
  const [currentTab, setCurrentTab] = useState(isDay ? 'day' : 'time-range')

  useEffect(() => {
    const isDay = location.pathname.includes('day')

    setCurrentTab(isDay ? 'day' : 'time-range')
  }, [location.pathname])

  const handleChangeTab = (_event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue)
    navigate(newValue)
  }

  return (
    <>
      <Box px={1.5} mb={1}>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          Поступления доски
        </Typography>
        <Tabs value={currentTab} onChange={handleChangeTab}>
          {tabs.map(tab => (
            <Tab key={tab.name} label={tab.name} value={tab.id} />
          ))}
        </Tabs>
      </Box>

      <Outlet />
    </>
  )
}
