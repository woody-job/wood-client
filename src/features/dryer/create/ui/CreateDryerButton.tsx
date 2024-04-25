import { Button, ButtonProps, Modal, TextField, Typography } from '@mui/material'
import { FormEventHandler, forwardRef, useState } from 'react'
import { ModalContent } from '@/shared/ui'

export const CreateDryerButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateUser: FormEventHandler = e => {
    e.preventDefault()
  }

  return (
    <>
      <Button ref={ref} variant='gray' size='medium' onClick={handleOpenModal} {...props} />

      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby='create-user-modal-title'
      >
        <ModalContent
          component='form'
          display='flex'
          flexDirection='column'
          onSubmit={handleCreateUser}
          gap={5}
        >
          <Typography id='create-user-modal-title' textAlign='center'>
            Добавить сушильную камеру
          </Typography>

          <TextField id='name' label='Название' variant='outlined' size='small' />

          <Button type='submit' variant='contained' color='primary'>
            Создать
          </Button>
        </ModalContent>
      </Modal>
    </>
  )
})
