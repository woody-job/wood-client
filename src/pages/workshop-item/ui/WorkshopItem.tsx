import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react'

import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

import { Box, Tab, Tabs, Typography } from '@mui/material'

import { useFetchAllWorkshopsQuery } from '@/entities/workshop'

export const WorkshopItem: FC = () => {
  const { workshopId } = useParams()
  const tabs = [
    { id: 'day', name: 'За день' },
    { id: 'time-range', name: 'За несколько дней' },
  ]

  const location = useLocation()
  const navigate = useNavigate()

  const { data: workshops } = useFetchAllWorkshopsQuery()

  const isDay = location.pathname.includes('day')
  const [currentTab, setCurrentTab] = useState(isDay ? 'day' : 'time-range')

  useEffect(() => {
    const isDay = location.pathname.includes('day')

    setCurrentTab(isDay ? 'day' : 'time-range')
  }, [location.pathname])

  const currentWorkshop = useMemo(
    () => workshops?.find(workshop => `${workshop.id}` === workshopId),
    [workshops, workshopId]
  )

  const handleChangeTab = (_event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue)
    navigate(newValue)
  }

  return (
    <>
      <Box px={1.5}>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          {currentWorkshop?.name}
        </Typography>
        <Tabs value={currentTab} onChange={handleChangeTab} sx={{ mt: 1 }}>
          {tabs.map(tab => (
            <Tab key={tab.name} label={tab.name} value={tab.id} />
          ))}
        </Tabs>
      </Box>

      <Outlet />
    </>
  )
}
