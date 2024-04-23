import { Button, ButtonProps, Modal, TextField, Typography } from '@mui/material'
import { FormEventHandler, forwardRef, useState } from 'react'
import { ModalContent } from '@/shared/ui'

export const CreateTimberMarkingButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
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
            gap={3}
          >
            <Typography
              id='create-user-modal-title'
              variant='h5'
              component='h2'
              sx={{ textAlign: 'center', mb: 5 }}
            >
              Создать обозначение
            </Typography>

            <TextField id='name' label='Название' variant='outlined' />

            <Button type='submit' sx={{ mt: 5 }} variant='contained' color='primary'>
              Создать
            </Button>
          </ModalContent>
        </Modal>
      </>
    )
  }
)
