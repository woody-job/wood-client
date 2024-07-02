import { forwardRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ButtonProps } from '@mui/material'

import { BuyerFormType,useCreateBuyerMutation } from '@/entities/buyer'
import { UpdateBuyerModal } from '@/entities/buyer/ui'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

import { useSnackbar } from 'notistack'

export const CreateBuyerButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [createBuyerMutation, { isLoading: isLoadingCreateBuyerMutation }] =
    useCreateBuyerMutation()
  const { enqueueSnackbar } = useSnackbar()

  const methods = useForm<BuyerFormType>()
  const { reset } = methods

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateBuyer: SubmitHandler<BuyerFormType> = values => {
    const { name } = values

    createBuyerMutation({ name })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Покупатель успешно создан', { variant: 'success' })
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

      <UpdateBuyerModal
        onUpdate={handleCreateBuyer}
        methods={methods}
        action={'Создать'}
        title={'Создать покупателя'}
        open={isOpenModal}
        onClose={handleCloseModal}
        isLoading={isLoadingCreateBuyerMutation}
      />
    </>
  )
})
