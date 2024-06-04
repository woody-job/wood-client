import { FC, useState } from 'react'

import { Box, Modal } from '@mui/material'

import { WorkshopCharts } from '@/widgets/workshopCharts'
import { WorkshopTotalTable } from '@/entities/workshop'
import { useTimeRangeInSearchParams } from '@/shared/libs/hooks/search-params-with-state'
import { CustomTabPanel, ModalContent } from '@/shared/ui'
import { ModalCloseButton } from '@/shared/ui/modal'
import { TimeRangeInputs } from '@/shared/ui/time-range'

export const WorkshopTimeRangeInfo: FC = () => {
  const { timeRange, handleSetTimeRange } = useTimeRangeInSearchParams()

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  return (
    <CustomTabPanel tabPanelValue={'time-range'} value={'time-range'}>
      <TimeRangeInputs range={timeRange} setRange={handleSetTimeRange} />

      <Box mt={3}>
        <WorkshopCharts timeRange={timeRange} />
      </Box>

      <Box mt={3}>
        <WorkshopTotalTable timeRange={timeRange} onFullscreen={handleOpen} />
        <Modal open={isOpen} onClose={handleClose}>
          <ModalContent fullscreen>
            <ModalCloseButton onClick={handleClose} />

            <WorkshopTotalTable timeRange={timeRange} fullscreen />
          </ModalContent>
        </Modal>
      </Box>
    </CustomTabPanel>
  )
}
