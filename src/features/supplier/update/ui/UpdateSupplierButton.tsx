import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ButtonProps, IconButton } from '@mui/material'

import {
  Supplier,
  SupplierFormType,
  UpdateSupplierModal,
  useUpdateSupplierMutation,
} from '@/entities/supplier'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { EditIcon } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export interface UpdateSupplierButtonProps extends ButtonProps {
  supplier: Supplier
}

export const UpdateSupplierButton: FC<UpdateSupplierButtonProps> = props => {
  const { supplier, ...buttonProps } = props

  const [isOpenModal, setIsOpenModal] = useState(false)

  const [updateSupplierMutation, { isLoading: isLoadingUpdateSupplierMutation }] =
    useUpdateSupplierMutation()

  const methods = useForm<SupplierFormType>({
    defaultValues: supplier,
  })
  const { enqueueSnackbar } = useSnackbar()

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleUpdateSupplierName: SubmitHandler<SupplierFormType> = values => {
    updateSupplierMutation({
      id: supplier.id,
      name: values.name,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Поставщик успешно обновлен', { variant: 'success' })
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

      <UpdateSupplierModal
        onUpdate={handleUpdateSupplierName}
        methods={methods}
        action={'Редактировать'}
        title={'Редактировать поставщика'}
        open={isOpenModal}
        onClose={handleCloseModal}
        isLoading={isLoadingUpdateSupplierMutation}
      />
    </>
  )
}
