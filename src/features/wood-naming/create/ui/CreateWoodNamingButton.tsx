import { forwardRef, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateWoodNamingModal } from '@/entities/wood-naming'

export const CreateWoodNamingButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateWoodNaming = (woodName: string) => {}

  return (
    <>
      <Button ref={ref} variant='gray' size='medium' onClick={handleOpenModal} {...props} />

      <UpdateWoodNamingModal
        onUpdate={handleCreateWoodNaming}
        action={'Создать'}
        title={'Создать обозначение'}
        open={isOpenModal}
        onClose={handleCloseModal}
      />
    </>
  )
})
