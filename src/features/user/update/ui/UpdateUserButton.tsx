import { FC, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateUserModal } from '@/entities/user'

export const UpdateUserButton: FC<ButtonProps> = props => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  // TODO update user
  const handleUpdateUser = (updatedUser: unknown) => {}

  return (
    <>
      <Button variant='gray' size='small' onClick={handleOpenModal} {...props} />

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
