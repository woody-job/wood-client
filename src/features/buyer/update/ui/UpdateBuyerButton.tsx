import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ButtonProps, IconButton } from '@mui/material'

import { Buyer, BuyerFormType, useUpdateBuyerMutation } from '@/entities/buyer'
import { UpdateBuyerModal } from '@/entities/buyer/ui'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { EditIcon } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export interface UpdateBuyerButtonProps extends ButtonProps {
  buyer: Buyer
}

export const UpdateBuyerButton: FC<UpdateBuyerButtonProps> = props => {
  const { buyer, ...buttonProps } = props

  const [isOpenModal, setIsOpenModal] = useState(false)

  const [updateBuyerMutation, { isLoading: isLoadingUpdateBuyerMutation }] =
    useUpdateBuyerMutation()

  const methods = useForm<BuyerFormType>({
    defaultValues: buyer,
  })
  const { enqueueSnackbar } = useSnackbar()

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleUpdateBuyerName: SubmitHandler<BuyerFormType> = values => {
    updateBuyerMutation({
      id: buyer.id,
      name: values.name,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Покупатель успешно обновлен', { variant: 'success' })
        handleCloseModal()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <>
      <IconButton onClick={handleOpenModal} {...buttonProps}>
        <EditIcon />
      </IconButton>

      <UpdateBuyerModal
        onUpdate={handleUpdateBuyerName}
        methods={methods}
        action={'Редактировать'}
        title={'Редактировать покупателя'}
        open={isOpenModal}
        onClose={handleCloseModal}
        isLoading={isLoadingUpdateBuyerMutation}
      />
    </>
  )
}
