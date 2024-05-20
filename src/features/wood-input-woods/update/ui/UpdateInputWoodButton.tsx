import { FC, useState } from 'react'

import { ButtonProps, IconButton } from '@mui/material'

import { UpdateInputWoodModal } from '@/entities/wood'
import { EditIcon } from '@/shared/ui'

export const UpdateInputWoodButton: FC<ButtonProps> = props => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleSubmit = () => {}

  return (
    <>
      <IconButton onClick={handleOpen} {...props}>
        <EditIcon />
      </IconButton>

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
