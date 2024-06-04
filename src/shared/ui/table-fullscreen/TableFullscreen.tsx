import { FC, ReactNode, useState } from 'react'

import { Box, Modal } from '@mui/material'

import { ModalContent } from '@/shared/ui'
import { ModalCloseButton } from '@/shared/ui/modal'

export type TableFullscreenProps = {
  renderTable: (props: { fullscreen?: boolean; onFullscreen?: () => void }) => ReactNode
}

export const TableFullscreen: FC<TableFullscreenProps> = props => {
  const { renderTable } = props

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <>
      {renderTable({ onFullscreen: handleOpen })}

      <Modal open={isOpen} onClose={handleClose}>
        <ModalContent fullscreen maxHeight='100%'>
          <ModalCloseButton onClick={handleClose} />

          <Box height='100%'>{renderTable({ fullscreen: true })}</Box>
        </ModalContent>
      </Modal>
    </>
  )
}
