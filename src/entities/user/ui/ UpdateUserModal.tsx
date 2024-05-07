import { FC, FormEventHandler } from 'react'

import {
  Box,
  Button,
  MenuItem,
  Modal,
  ModalProps,
  Select,
  TextField,
  Typography,
} from '@mui/material'

import { ModalContent } from '@/shared/ui'

export interface UpdateUserModalProps extends Omit<ModalProps, 'children'> {
  user?: unknown
  onUpdate?: (user: unknown) => void
  title: string
  action: string
  // TODO make user model
}

export const UpdateUserModal: FC<UpdateUserModalProps> = ({
  title,
  action,
  onUpdate,
  ...modalProps
}) => {
  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()

    onUpdate && onUpdate({}) // TODO user  validation
  }

  return (
    <Modal {...modalProps} aria-labelledby='create-user-modal-title'>
      <ModalContent>
        <Typography
          id='create-user-modal-title'
          variant='h5'
          component='h2'
          sx={{ textAlign: 'center', mb: 5 }}
        >
          {title}
        </Typography>

        <Box
          component='form'
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          onSubmit={handleSubmit}
        >
          <TextField id='name' label='Фамилия' variant='outlined' size='small' />
          <TextField id='name' label='Имя' variant='outlined' size='small' />
          <TextField id='name' label='Отчество' variant='outlined' size='small' />

          <Select size='small' defaultValue='default'>
            <MenuItem value='default'>--Роль--</MenuItem>
            <MenuItem value='admin'>Администратор</MenuItem>
            <MenuItem value='super-admin'>Супер Администратор</MenuItem>
            <MenuItem value='user'>Пользователь</MenuItem>
          </Select>

          <TextField id='name' type='password' label='Пароль' variant='outlined' size='small' />
          <Button type='submit' sx={{ mt: 5 }} variant='contained' color='primary'>
            {action}
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  )
}
