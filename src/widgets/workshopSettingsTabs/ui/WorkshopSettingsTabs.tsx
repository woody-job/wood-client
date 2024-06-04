import { FC, useState } from 'react'

import { Box, CircularProgress, Modal, Tab, Tabs } from '@mui/material'

import { useFetchAllWorkshopsQuery } from '@/entities/workshop/api'
import { appSearchParams } from '@/shared/constants'
import { useSearchParamsTabs } from '@/shared/libs/hooks'
import { CustomTabPanel } from '@/shared/ui'
import { ModalCloseButton, ModalContent } from '@/shared/ui/modal'

import { WorkshopPrices } from '../ui/workshopPrices'
import { WorkshopWoodPricesTable } from './workshopWoodPricesTable'

const getTabValue = (id: number) => 'workshop' + id

export const WorkshopSettingsTabs: FC = () => {
  const { data: workshops, isLoading: isLoadingWorkshops } = useFetchAllWorkshopsQuery()

  const [isOpen, setIsOpen] = useState(false)

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const { currentTab, handleChangeTab } = useSearchParamsTabs(
    appSearchParams.currentTab,
    workshops,
    tab => {
      if (tab) {
        return getTabValue(tab.id)
      }

      return ''
    },
    workshops ? workshops[0] : null
  )

  const currentTabValue = currentTab ? getTabValue(currentTab.id) : 0

  if (isLoadingWorkshops) {
    return (
      <Box sx={{ height: 800, display: 'grid', placeContent: 'center' }}>
        <CircularProgress size={60} />
      </Box>
    )
  }

  return (
    <Box>
      <Tabs value={currentTabValue} onChange={handleChangeTab} sx={{ mt: 5 }}>
        {workshops?.map(workshop => (
          <Tab key={workshop.name} label={workshop.name} value={getTabValue(workshop.id)} />
        ))}
      </Tabs>

      {workshops?.map(workshop => {
        return (
          <CustomTabPanel
            key={workshop.name}
            value={currentTabValue as string}
            tabPanelValue={getTabValue(workshop.id)}
          >
            <WorkshopPrices workshop={workshop} />

            <Modal open={isOpen} onClose={handleCloseModal}>
              <ModalContent fullscreen>
                <ModalCloseButton onClick={handleCloseModal} />
                <WorkshopWoodPricesTable workshop={workshop} fullscreen />
              </ModalContent>
            </Modal>

            <WorkshopWoodPricesTable workshop={workshop} onFullscreen={handleOpenModal} />
          </CustomTabPanel>
        )
      })}
    </Box>
  )
}
