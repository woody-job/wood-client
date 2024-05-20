import { FC, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateInputWoodModal } from '@/entities/wood'

export const UpdateInputWoodButton: FC<ButtonProps> = props => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleSubmit = () => {}

  return (
    <>
      <Button size='small' variant='gray' onClick={handleOpen} {...props} />

      <UpdateInputWoodModal
        title={'Изменить доску на вход'}
        action={'Изменить'}
        onUpdate={handleSubmit}
        open={isOpen}
        onClose={handleClose}
      />
    </>
  )
}
