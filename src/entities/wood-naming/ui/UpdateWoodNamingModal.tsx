import { FC, FormEventHandler } from 'react'

import { Button, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'

export interface UpdateWoodNamingModalProps extends Omit<ModalProps, 'children'> {
  onUpdate: (woodName: string) => void
  action: string
  title: string
  woodName?: string
}

export const UpdateWoodNamingModal: FC<UpdateWoodNamingModalProps> = ({
  onUpdate,
  action,
  title,
  ...modalProps
}) => {
  const handleCreateUser: FormEventHandler = e => {
    e.preventDefault()
    onUpdate('') // TODO create wood naming
  }

  return (
    <Modal {...modalProps} aria-labelledby='create-user-modal-title'>
      <ModalContent
        component='form'
        display='flex'
        flexDirection='column'
        onSubmit={handleCreateUser}
        gap={5}
      >
        <Typography id='create-user-modal-title'>{title}</Typography>

        <TextField id='name' label='Название' variant='outlined' size='small' />

        <Button type='submit' variant='contained' color='primary'>
          {action}
        </Button>
      </ModalContent>
    </Modal>
  )
}
