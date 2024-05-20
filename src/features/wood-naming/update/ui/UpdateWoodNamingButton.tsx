import { FC, useState } from 'react'

import { ButtonProps, IconButton } from '@mui/material'

import { UpdateWoodNamingModal } from '@/entities/wood-naming'
import { EditIcon } from '@/shared/ui'

export const UpdateWoodNamingButton: FC<ButtonProps> = props => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleUpdateWoodName = () => {
    handleCloseModal()
  }

  return (
    <>
      <IconButton onClick={handleOpenModal} {...props}>
        <EditIcon />
      </IconButton>

      <UpdateWoodNamingModal
        onUpdate={handleUpdateWoodName}
        action={'Редактировать'}
        title={'Редактирвать обозначение'}
        open={isOpenModal}
        onClose={handleCloseModal}
      />
    </>
  )
}
