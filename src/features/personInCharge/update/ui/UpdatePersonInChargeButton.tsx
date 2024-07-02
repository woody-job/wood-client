import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ButtonProps, IconButton } from '@mui/material'

import {
  PersonInCharge,
  PersonInChargeFormType,
  UpdatePersonInChargeModal,
  useUpdatePersonInChargeMutation,
} from '@/entities/personInCharge'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { EditIcon } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export interface UpdatePersonInChargeButtonProps extends ButtonProps {
  personInCharge: PersonInCharge
}

export const UpdatePersonInChargeButton: FC<UpdatePersonInChargeButtonProps> = props => {
  const { personInCharge, ...buttonProps } = props

  const [isOpenModal, setIsOpenModal] = useState(false)

  const [updatePersonInChargeMutation, { isLoading: isLoadingUpdatePersonInChargeMutation }] =
    useUpdatePersonInChargeMutation()

  const methods = useForm<PersonInChargeFormType>({
    defaultValues: personInCharge,
  })
  const { enqueueSnackbar } = useSnackbar()

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleUpdatePersonInChargeName: SubmitHandler<PersonInChargeFormType> = values => {
    updatePersonInChargeMutation({
      id: personInCharge.id,
      initials: values.initials,
      secondName: values.secondName,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Ответственный успешно обновлен', { variant: 'success' })
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

      <UpdatePersonInChargeModal
        onUpdate={handleUpdatePersonInChargeName}
        methods={methods}
        action={'Редактировать'}
        title={'Редактировать ответственного'}
        open={isOpenModal}
        onClose={handleCloseModal}
        isLoading={isLoadingUpdatePersonInChargeMutation}
      />
    </>
  )
}
