import { FC } from 'react'

import { Box, Button, Divider, Modal, ModalProps, Stack, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'
import { ModalCloseButton } from '@/shared/ui/modal'

export type DeleteDataAlertModalProps = Omit<ModalProps, 'onClose' | 'children'> & {
  onClose?: () => void
  onNextModal?: () => void
}

export const DeleteDataAlertModal: FC<DeleteDataAlertModalProps> = props => {
  const { onClose: handleClose, onNextModal, ...modalProps } = props

  const dataToDelete = [
    'Вход цехов',
    'Выход цехов',
    'Поступления доски',
    'Отгрузки доски',
    'Склад доски',
    'Поступления сырья',
    'Отгрузки сырья',
    'Склад сырья',
    'Ежедневные данные о работе цеха',
    'Созданные сушилки',
  ]

  return (
    <Modal {...modalProps} onClose={handleClose}>
      <ModalContent sx={{ width: 500 }}>
        <ModalCloseButton onClick={handleClose} />
        <Typography variant='h6'>Удаление всех данных о работе предприятия</Typography>
        <Divider sx={{ my: 1 }} />

        <Typography>Следующие данные будут стерты из базы данных:</Typography>
        <Stack component='ul'>
          {dataToDelete.map(el => (
            <Typography component='li'>{el}</Typography>
          ))}
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Box display='flex' justifyContent='end' gap={1}>
          <Button variant='gray' onClick={handleClose}>
            Отмена
          </Button>
          <Button onClick={onNextModal}>Продолжить</Button>
        </Box>
      </ModalContent>
    </Modal>
  )
}
