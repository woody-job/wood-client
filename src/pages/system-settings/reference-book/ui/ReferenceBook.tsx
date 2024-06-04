import { useState } from 'react'

import { Box, Modal } from '@mui/material'

import { DimensionsSettingsTable } from '@/widgets/dimensionsSettingsTable'
import { CreateDimensionButton } from '@/features/dimensions/create'
import { useFetchAllDimensionsQuery } from '@/entities/dimension'
import { ModalContent } from '@/shared/ui'
import { ModalCloseButton } from '@/shared/ui/modal'

export const ReferenceBook = () => {
  const { data: dimensions, isLoading: isLoadingDimensions } = useFetchAllDimensionsQuery()

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <Box display={'flex'} flexDirection='column'>
      <CreateDimensionButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateDimensionButton>

      <DimensionsSettingsTable
        dimensions={dimensions}
        isLoadingDimensions={isLoadingDimensions}
        onFullscreen={handleOpen}
      />
      <Modal open={isOpen} onClose={handleClose}>
        <ModalContent fullscreen>
          <ModalCloseButton onClick={handleClose} />
          <DimensionsSettingsTable
            dimensions={dimensions}
            isLoadingDimensions={isLoadingDimensions}
            fullscreen
          />
        </ModalContent>
      </Modal>
    </Box>
  )
}
