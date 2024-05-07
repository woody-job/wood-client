import { FC, FormEventHandler } from 'react'

import { Button, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'

export interface UpdateDryerModalProps extends Omit<ModalProps, 'children'> {
  title: string
  action: string
  onUpdate: (dryer: unknown) => void
  dryer?: unknown
}

export const UpdateDryerModal: FC<UpdateDryerModalProps> = ({
  title,
  action,
  onUpdate,
  dryer,
  ...modalProps
}) => {
  const handleUpdateDryer: FormEventHandler = e => {
    e.preventDefault()
    onUpdate(dryer) // TODO: add dryer
  }

  return (
    <Modal {...modalProps} aria-labelledby='create-user-modal-title'>
      <ModalContent
        component='form'
        display='flex'
        flexDirection='column'
        onSubmit={handleUpdateDryer}
        gap={5}
      >
        <Typography id='create-user-modal-title' textAlign='center'>
          {title}
        </Typography>

        <TextField id='name' label='Название' variant='outlined' size='small' />

        <Button type='submit' variant='contained' color='primary'>
          {action}
        </Button>
      </ModalContent>
    </Modal>
  )
}
