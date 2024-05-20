import { FC, useState } from 'react'

import { ButtonProps, IconButton } from '@mui/material'

import { UpdateOutputWoodModal } from '@/entities/wood'
import { EditIcon } from '@/shared/ui'

export const UpdateOutputWoodButton: FC<ButtonProps> = props => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleSubmit = () => {}

  return (
    <>
      <IconButton onClick={handleOpen} {...props}>
        <EditIcon />
      </IconButton>

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
