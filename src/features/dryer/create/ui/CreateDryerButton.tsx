import { forwardRef, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { DryerFormType, UpdateDryerModal, useCreateDryerMutation } from '@/entities/dryer'
import { SubmitHandler, useForm } from 'react-hook-form'

export const CreateDryerButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const methods = useForm<DryerFormType>()
  const { reset } = methods

  const [createDryerMutation] = useCreateDryerMutation()

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateDryer: SubmitHandler<DryerFormType> = (values) => {
    const { name } = values

    createDryerMutation({ name })
      .unwrap()
      .then(() => {
        handleCloseModal()
        reset()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <>
      <Button ref={ref} variant="gray" size="medium" onClick={handleOpenModal} {...props} />

      <UpdateDryerModal
        title={'Создать сушильную камеру'}
        methods={methods}
        action={'Создать'}
        onUpdate={handleCreateDryer}
        open={isOpenModal}
        onClose={handleCloseModal}
      />
    </>
  )
})
