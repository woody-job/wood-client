import { FC, useState } from 'react'

import { ButtonProps, IconButton } from '@mui/material'

import { UpdateUserModal } from '@/entities/user'
import { EditIcon } from '@/shared/ui'

export const UpdateUserButton: FC<ButtonProps> = props => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  // TODO update user
  const handleUpdateUser = () => {}

  return (
    <>
      <IconButton onClick={handleOpenModal} {...props}>
        <EditIcon />
      </IconButton>

      <UpdateUserModal
        open={isOpenModal}
        onClose={handleCloseModal}
        onUpdate={handleUpdateUser}
        user={{}}
        title='Редактирвать пользователя'
        action='Редактировать'
      />
    </>
  )
}
