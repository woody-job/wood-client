import { forwardRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ButtonProps } from '@mui/material'

import { DryerFormType, UpdateDryerModal, useCreateDryerMutation } from '@/entities/dryer'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

import { useSnackbar } from 'notistack'

export const CreateDryerButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const methods = useForm<DryerFormType>()
  const { reset } = methods

  const [createDryerMutation, { isLoading: isLoadingCreateDryerMutation }] =
    useCreateDryerMutation()
  const { enqueueSnackbar } = useSnackbar()

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateDryer: SubmitHandler<DryerFormType> = values => {
    const { name } = values

    createDryerMutation({ name })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Сушильная успешно камера создана', { variant: 'success' })
        handleCloseModal()
        reset()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <>
      <Button ref={ref} variant='gray' size='medium' onClick={handleOpenModal} {...props} />

      <UpdateDryerModal
        title={'Создать сушильную камеру'}
        methods={methods}
        action={'Создать'}
        onUpdate={handleCreateDryer}
        open={isOpenModal}
        onClose={handleCloseModal}
        isLoading={isLoadingCreateDryerMutation}
      />
    </>
  )
})
