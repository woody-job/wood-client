import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ButtonProps, IconButton } from '@mui/material'

import {
  UpdateWoodNamingModal,
  useUpdateWoodNamingMutation,
  WoodNaming,
  WoodNamingFormType,
} from '@/entities/wood-naming'
import { CommonErrorType } from '@/shared/types'
import { EditIcon } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export interface UpdateWoodNamingButtonProps extends ButtonProps {
  woodNaming: WoodNaming
}

export const UpdateWoodNamingButton: FC<UpdateWoodNamingButtonProps> = props => {
  const { woodNaming, ...buttonProps } = props

  const [isOpenModal, setIsOpenModal] = useState(false)

  const [updateWoodNamingMutation] = useUpdateWoodNamingMutation()

  const methods = useForm<WoodNamingFormType>({
    defaultValues: woodNaming,
  })
  const { enqueueSnackbar } = useSnackbar()

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleUpdateWoodName: SubmitHandler<WoodNamingFormType> = values => {
    updateWoodNamingMutation({
      id: woodNaming.id,
      name: values.name,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Обозначение успешно обновлено', { variant: 'success' })
        handleCloseModal()
      })
      .catch((error: CommonErrorType) => {
        enqueueSnackbar(error.data.message, { variant: 'error' })
      })
  }

  return (
    <>
      <IconButton onClick={handleOpenModal} {...buttonProps}>
        <EditIcon />
      </IconButton>

      <UpdateWoodNamingModal
        onUpdate={handleUpdateWoodName}
        methods={methods}
        action={'Редактировать'}
        title={'Редактирвать обозначение'}
        open={isOpenModal}
        onClose={handleCloseModal}
      />
    </>
  )
}
