import { FC, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateInputWoodModal } from '@/entities/wood'

export const AddInputWoodButton: FC<ButtonProps> = props => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleSubmit = () => {}

  return (
    <>
      <Button size='small' onClick={handleOpen} {...props} />

      <UpdateInputWoodModal
        title={'Добавить доски на вход'}
        action={'Добавить'}
        onUpdate={handleSubmit}
        open={isOpen}
        onClose={handleClose}
      />
    </>
  )
}
