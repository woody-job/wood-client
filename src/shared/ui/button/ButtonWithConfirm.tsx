import { FC, useState } from 'react'

import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

export interface ButtonWithConfirmProps extends ButtonProps {
  header: string
  description: string
  submitText?: string
  cancelText?: string
  onConfirm: () => void
}

export const ButtonWithConfirm: FC<ButtonWithConfirmProps> = props => {
  const { onConfirm, header, description, submitText, cancelText, ...buttonProps } = props

  const [isOpenAlert, setIsOpenAlert] = useState(false)

  const handleCloseAlert = () => setIsOpenAlert(false)
  const handleOpenAlert = () => setIsOpenAlert(true)

  const handleSubmit = () => {
    handleCloseAlert()
    onConfirm()
  }

  return (
    <>
      <Button variant='contained' size='small' onClick={handleOpenAlert} {...buttonProps} />

      <Dialog
        open={isOpenAlert}
        onClose={handleCloseAlert}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{header}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>{submitText || 'Удалить'}</Button>
          <Button onClick={handleCloseAlert} variant='gray' autoFocus>
            {cancelText || 'Отмена'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
