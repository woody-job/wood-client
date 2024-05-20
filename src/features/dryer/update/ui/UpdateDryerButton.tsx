import { FC, useState } from 'react'

import { ButtonProps, IconButton } from '@mui/material'

import { UpdateDryerModal } from '@/entities/dryer'
import { EditIcon } from '@/shared/ui'

export const UpdateDryerButton: FC<ButtonProps> = props => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateDryer = () => {
    handleCloseModal()
  }

  return (
    <>
      <IconButton onClick={handleOpenModal} {...props}>
        <EditIcon />
      </IconButton>

      <UpdateDryerModal
        title={'Редактировать сушильную камеру'}
        action={'Редактировать'}
        onUpdate={handleCreateDryer}
        open={isOpenModal}
        onClose={handleCloseModal}
      />
    </>
  )
}
