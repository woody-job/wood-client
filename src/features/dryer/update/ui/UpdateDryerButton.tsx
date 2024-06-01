import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ButtonProps, IconButton } from '@mui/material'

import { Dryer, DryerFormType, UpdateDryerModal, useUpdateDryerMutation } from '@/entities/dryer'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { EditIcon } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export type UpdateDryerButtonProps = ButtonProps & {
  dryer: Dryer
}

export const UpdateDryerButton: FC<UpdateDryerButtonProps> = props => {
  const { dryer, ...buttonProps } = props
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [updateDryerMutation, { isLoading: isLoadingUpdateDryerMutation }] =
    useUpdateDryerMutation()
  const methods = useForm<DryerFormType>({
    defaultValues: {
      ...dryer,
    },
  })

  const { enqueueSnackbar } = useSnackbar()

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateDryer: SubmitHandler<DryerFormType> = values => {
    const { name } = values

    updateDryerMutation({ name, id: dryer.id })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Сушильная камера успешно обновлена', { variant: 'success' })
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

      <UpdateDryerModal
        title={'Редактировать название сушильной камеры'}
        action={'Редактировать'}
        methods={methods}
        onUpdate={handleCreateDryer}
        open={isOpenModal}
        onClose={handleCloseModal}
        isLoading={isLoadingUpdateDryerMutation}
      />
    </>
  )
}
