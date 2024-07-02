import { forwardRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ButtonProps } from '@mui/material'

import {
  SupplierFormType,
  UpdateSupplierModal,
  useCreateSupplierMutation,
} from '@/entities/supplier'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

import { useSnackbar } from 'notistack'

export const CreateSupplierButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [createSupplierMutation, { isLoading: isLoadingCreateSupplierMutation }] =
    useCreateSupplierMutation()
  const { enqueueSnackbar } = useSnackbar()

  const methods = useForm<SupplierFormType>()
  const { reset } = methods

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateSupplier: SubmitHandler<SupplierFormType> = values => {
    const { name } = values

    createSupplierMutation({ name })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Поставщик успешно создан', { variant: 'success' })
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

      <UpdateSupplierModal
        onUpdate={handleCreateSupplier}
        methods={methods}
        action={'Создать'}
        title={'Создать поставщика'}
        open={isOpenModal}
        onClose={handleCloseModal}
        isLoading={isLoadingCreateSupplierMutation}
      />
    </>
  )
})
