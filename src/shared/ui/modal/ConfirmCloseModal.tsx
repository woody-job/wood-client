import { FC } from 'react'

import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from '@mui/material'

import { ModalContent } from './ModalContent'

export type ConfirmCloseModalProps = {
  isConfirmCloseModalOpen: boolean
  handleCloseConfirmModal: () => void
  handleSubmitConfirmModal: () => void
  title: string
  description: string
}

export const ConfirmCloseModal: FC<ConfirmCloseModalProps> = ({
  isConfirmCloseModalOpen,
  handleCloseConfirmModal,
  handleSubmitConfirmModal,
  title,
  description,
}) => {
  return (
    <Modal open={isConfirmCloseModalOpen} onClose={handleCloseConfirmModal}>
      <ModalContent
        component='form'
        onSubmit={handleSubmitConfirmModal}
        display='flex'
        flexDirection='column'
        sx={{
          maxHeight: '90vh',
          p: 0,
        }}
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitConfirmModal}>Закрыть</Button>
          <Button onClick={handleCloseConfirmModal} variant='gray' autoFocus>
            Отмена
          </Button>
        </DialogActions>
      </ModalContent>
    </Modal>
  )
}
