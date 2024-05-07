import { FC, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateWoodNamingModal } from '@/entities/wood-naming'

export const UpdateWoodNamingButton: FC<ButtonProps> = props => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleUpdateWoodName = () => {
      handleCloseModal()
    }

  return (
    <>
      <Button variant='gray' size='small' onClick={handleOpenModal} {...props} />

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
