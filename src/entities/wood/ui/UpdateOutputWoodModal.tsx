import { FC, FormEventHandler } from 'react'

import { Button, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'

export interface UpdateOutputWoodModalProps extends Omit<ModalProps, 'children'> {
  title: string
  action: string
  onUpdate: () => void
}

export const UpdateOutputWoodModal: FC<UpdateOutputWoodModalProps> = ({
  title,
  action,
  onUpdate,
  ...modalProps
}) => {
  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()
    onUpdate()
  }

  return (
    <Modal {...modalProps}>
      <ModalContent
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={handleSubmit}
      >
        <Typography variant='h5' component='h2' sx={{ textAlign: 'center', mb: 5 }}>
          {title}
        </Typography>
        <TextField label='Сечение' variant='outlined' />
        <TextField label='Порода' variant='outlined' />
        <TextField label='Сорт' variant='outlined' />
        <TextField label='Количество' variant='outlined' />
        <Button type='submit' sx={{ mt: 5 }} variant='contained' color='primary'>
          {action}
        </Button>
      </ModalContent>
    </Modal>
  )
}
