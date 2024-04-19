import {
  Box,
  Button,
  ButtonProps,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { FormEventHandler, forwardRef, useState } from 'react'
import { ModalContent } from '@/shared/ui'

export const CreateUserButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateUser: FormEventHandler<HTMLFormElement> = e => {
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
        <ModalContent>
          <Typography
            id='create-user-modal-title'
            variant='h5'
            component='h2'
            sx={{ textAlign: 'center', mb: 5 }}
          >
            Создать пользователя
          </Typography>

          <Box
            component='form'
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            onSubmit={handleCreateUser}
          >
            <TextField id='name' label='Фамилия' variant='outlined' size='small' />
            <TextField id='name' label='Имя' variant='outlined' size='small' />
            <TextField id='name' label='Отчество' variant='outlined' size='small' />

            <Select size='small'>
              <MenuItem value='admin'>Администратор</MenuItem>
              <MenuItem value='super-admin'>Супер Администратор</MenuItem>
              <MenuItem value='user'>Пользователь</MenuItem>
            </Select>

            <TextField id='name' type='password' label='Пароль' variant='outlined' size='small' />
            <TextField
              id='name'
              type='password'
              label='Повторите пароль'
              variant='outlined'
              size='small'
            />

            <Button type='submit' sx={{ mt: 5 }} variant='contained' color='primary'>
              Создать
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
})
