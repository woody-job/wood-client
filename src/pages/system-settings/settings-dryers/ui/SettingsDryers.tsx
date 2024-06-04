import { useState } from 'react'

import { Box, Modal } from '@mui/material'

import { DryersTable } from '@/widgets/dryersTable'
import { CreateDryerButton } from '@/features/dryer/create'
import { useFetchAllDryersQuery } from '@/entities/dryer'
import { ModalContent } from '@/shared/ui'
import { ModalCloseButton } from '@/shared/ui/modal'

export const SettingsDryers = () => {
  const { data: dryers, isLoading } = useFetchAllDryersQuery()

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <Box>
      <Box display={'flex'} flexDirection='column'>
        <CreateDryerButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateDryerButton>

        <Modal open={isOpen} onClose={handleClose}>
          <ModalContent fullscreen>
            <ModalCloseButton onClick={handleClose} />
            <DryersTable dryers={dryers} isLoadingDryers={isLoading} fullscreen />
          </ModalContent>
        </Modal>

        <DryersTable dryers={dryers} isLoadingDryers={isLoading} onFullscreen={handleOpen} />
      </Box>
    </Box>
  )
}
