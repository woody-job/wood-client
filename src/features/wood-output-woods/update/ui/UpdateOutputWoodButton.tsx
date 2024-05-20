import { FC, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateOutputWoodModal } from '@/entities/wood'

export const UpdateOutputWoodButton: FC<ButtonProps> = props => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleSubmit = () => {}

  return (
    <>
      <Button size='small' variant='gray' onClick={handleOpen} {...props} />

      <UpdateOutputWoodModal
        title={'Изменить доску на выход'}
        action={'Изменить'}
        onUpdate={handleSubmit}
        open={isOpen}
        onClose={handleClose}
      />
    </>
  )
}
