import { Button, ButtonProps, Modal, TextField, Typography } from '@mui/material'
import { FC, FormEventHandler, useState } from 'react'
import { ModalContent } from '@/shared/ui'

export const UpdateDryerButton: FC<ButtonProps> = props => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleUpdateUser: FormEventHandler = e => {
    e.preventDefault()
  }

  return (
    <>
      <Button variant='gray' size='small' onClick={handleOpenModal} {...props} />

      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby='create-user-modal-title'
      >
        <ModalContent
          component='form'
          display='flex'
          flexDirection='column'
          gap={3}
          onSubmit={handleUpdateUser}
        >
          <Typography
            id='create-user-modal-title'
            variant='h5'
            component='h2'
            sx={{ textAlign: 'center', mb: 5 }}
          >
            Редактировать сушильную камеру
          </Typography>

          <TextField id='name' label='Название' variant='outlined' size='small' />

          <Button type='submit' sx={{ mt: 5 }} variant='contained' color='primary'>
            Редактировать
          </Button>
        </ModalContent>
      </Modal>
    </>
  )
}
