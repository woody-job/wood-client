import { forwardRef, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateDryerModal } from '@/entities/dryer'

export const CreateDryerButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateDryer = (dryer: unknown) => {
    handleCloseModal()
  }

  return (
    <>
      <Button ref={ref} variant='gray' size='medium' onClick={handleOpenModal} {...props} />

      <UpdateDryerModal
        title={'Создать сушильную камеру'}
        action={'Создать'}
        onUpdate={handleCreateDryer}
        open={isOpenModal}
        onClose={handleCloseModal}
      />
    </>
  )
})
