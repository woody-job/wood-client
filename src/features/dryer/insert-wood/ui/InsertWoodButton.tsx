import { FC, FormEventHandler, useState } from 'react'

import { Button, ButtonProps, Modal, TextField, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'

export const InsertWoodButton: FC<ButtonProps> = props => {
  const [isOpenInsert, setIsOpenInsert] = useState(false)

  const handleCloseInsert = () => setIsOpenInsert(false)

  const handleSubmitInsert: FormEventHandler = e => {
    e.preventDefault()
  }

  const handleOpenInsert = () => setIsOpenInsert(true)

  return (
    <>
      <Button variant='outlined' onClick={handleOpenInsert} {...props} />

      <Modal
        open={isOpenInsert}
        onClose={handleCloseInsert}
        aria-labelledby='create-user-modal-title'
      >
        <ModalContent
          component='form'
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          onSubmit={handleSubmitInsert}
        >
          <Typography
            id='create-user-modal-title'
            variant='h5'
            component='h2'
            sx={{ textAlign: 'center', mb: 5 }}
          >
            Внести доски
          </Typography>
          <TextField label='Сорт' variant='outlined' />
          <TextField label='Сечение' variant='outlined' />
          <TextField label='Порода' variant='outlined' />
          <TextField label='Количество' variant='outlined' />
          <Button type='submit' sx={{ mt: 5 }} variant='contained' color='primary'>
            Внести
          </Button>
        </ModalContent>
      </Modal>
    </>
  )
}
