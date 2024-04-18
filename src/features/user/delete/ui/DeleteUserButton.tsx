import { tokens } from '@/shared/constants/tokens'
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { FC, useState } from 'react'

export const DeleteUserButton: FC<ButtonProps> = props => {
  const [isOpenAlert, setIsOpenAlert] = useState(false)

  const handleCloseAlert = () => setIsOpenAlert(false)
  const handleOpenAlert = () => setIsOpenAlert(true)

  const handleDeleteUser = () => {
    handleCloseAlert()
  }

  return (
    <>
      <Button variant='contained' size='small' onClick={handleOpenAlert} {...props} />

      <Dialog
        open={isOpenAlert}
        onClose={handleCloseAlert}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Удалить пользователя</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Вы точно хотите удалить этого пользователя?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteUser}>Удалить</Button>
          <Button onClick={handleCloseAlert} variant='gray' autoFocus>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
