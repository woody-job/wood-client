import { useState } from 'react'

import { Box, Modal } from '@mui/material'

import { WoodNamingsTable } from '@/widgets/woodNamingTable'
import { CreateWoodNamingButton } from '@/features/wood-naming/create'
import { useFetchAllWoodNamingsQuery } from '@/entities/wood-naming'
import { ModalContent } from '@/shared/ui'
import { ModalCloseButton } from '@/shared/ui/modal'

export const WoodNamings = () => {
  const { data: woodNamings, isLoading } = useFetchAllWoodNamingsQuery()

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
        <CreateWoodNamingButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateWoodNamingButton>

        <WoodNamingsTable
          woodNamings={woodNamings}
          isLoadingWoodNamings={isLoading}
          onFullscreen={handleOpen}
        />

        <Modal open={isOpen} onClose={handleClose}>
          <ModalContent fullscreen>
            <ModalCloseButton onClick={handleClose} />
            <WoodNamingsTable
              woodNamings={woodNamings}
              isLoadingWoodNamings={isLoading}
              fullscreen
            />
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  )
}
