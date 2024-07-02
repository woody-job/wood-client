import { forwardRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ButtonProps } from '@mui/material'

import {
  PersonInChargeFormType,
  UpdatePersonInChargeModal,
  useCreatePersonInChargeMutation,
} from '@/entities/personInCharge'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

import { useSnackbar } from 'notistack'

export const CreatePersonInChargeButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const [createPersonInChargeMutation, { isLoading: isLoadingCreatePersonInChargeMutation }] =
      useCreatePersonInChargeMutation()
    const { enqueueSnackbar } = useSnackbar()

    const methods = useForm<PersonInChargeFormType>()
    const { reset } = methods

    const handleOpenModal = () => setIsOpenModal(true)
    const handleCloseModal = () => setIsOpenModal(false)

    const handleCreatePersonInCharge: SubmitHandler<PersonInChargeFormType> = values => {
      const { initials, secondName } = values

      createPersonInChargeMutation({ initials, secondName })
        .unwrap()
        .then(() => {
          enqueueSnackbar('Ответственный успешно создан', { variant: 'success' })
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

        <UpdatePersonInChargeModal
          onUpdate={handleCreatePersonInCharge}
          methods={methods}
          action={'Создать'}
          title={'Создать ответственного'}
          open={isOpenModal}
          onClose={handleCloseModal}
          isLoading={isLoadingCreatePersonInChargeMutation}
        />
      </>
    )
  }
)
