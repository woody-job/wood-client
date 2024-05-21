import { FC, FormEventHandler } from 'react'

import { Button, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'

export interface UpdateWoodsModalProps extends Omit<ModalProps, 'children'> {
  title: string
  actionTitle: string
  onSubmit: () => void
}

export const UpdateWoodsModal: FC<UpdateWoodsModalProps> = props => {
  const { title, actionTitle, onSubmit, ...modalProps } = props

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <Modal {...modalProps}>
      <ModalContent
        component='form'
        onSubmit={handleSubmit}
        display='flex'
        flexDirection='column'
        gap={1}
      >
        <Typography sx={{ mb: 2 }}>{title}</Typography>
        <TextField label='Сечение' />
        <TextField label='Сорт' />
        <TextField label='Количество' />
        <Button type='submit' sx={{ mt: 2 }}>
          {actionTitle}
        </Button>
      </ModalContent>
    </Modal>
  )
}
