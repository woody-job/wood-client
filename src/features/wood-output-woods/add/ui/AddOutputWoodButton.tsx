import { FC, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateOutputWoodModal } from '@/entities/wood'

export const AddOutputWoodButton: FC<ButtonProps> = props => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleSubmit = () => {}

  return (
    <>
      <Button size='small' onClick={handleOpen} {...props} />

      <UpdateOutputWoodModal
        title={'Добавить доски на выход'}
        action={'Добавить'}
        onUpdate={handleSubmit}
        open={isOpen}
        onClose={handleClose}
      />
    </>
  )
}
