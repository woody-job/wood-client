import { FC, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateDryerModal } from '@/entities/dryer'

export const UpdateDryerButton: FC<ButtonProps> = props => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateDryer = () => {
    handleCloseModal()
  }

  return (
    <>
      <Button variant='gray' size='small' onClick={handleOpenModal} {...props} />

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
