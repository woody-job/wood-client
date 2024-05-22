import { forwardRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ButtonProps } from '@mui/material'

import {
  UpdateWoodNamingModal,
  useCreateWoodNamingMutation,
  WoodNamingFormType,
} from '@/entities/wood-naming'

export const CreateWoodNamingButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [createWoodNamingMutation] = useCreateWoodNamingMutation()

  const methods = useForm<WoodNamingFormType>()
  const { reset } = methods

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateWoodNaming: SubmitHandler<WoodNamingFormType> = values => {
    const { name } = values

    createWoodNamingMutation({ name })
      .unwrap()
      .then(() => {
        handleCloseModal()
        reset()
      })
      .catch(e => {
        console.error(e)
      })
  }

  return (
    <>
      <Button ref={ref} variant='gray' size='medium' onClick={handleOpenModal} {...props} />

      <UpdateWoodNamingModal
        onUpdate={handleCreateWoodNaming}
        methods={methods}
        action={'Создать'}
        title={'Создать обозначение'}
        open={isOpenModal}
        onClose={handleCloseModal}
      />
    </>
  )
})
