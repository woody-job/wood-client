import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Typography } from '@mui/material'

import {
  DeleteAllFormType,
  DeleteDataAlertModal,
  DeleteDataFinalModal,
} from '@/features/all-data/delete'
import { useDeleteUserCreatedDataMutation } from '@/entities/data'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

import { useSnackbar } from 'notistack'

export const DeleteDataButton = () => {
  const [openModalIndex, setOpenModalIndex] = useState<number>()

  const [deleteUserCreatedData] = useDeleteUserCreatedDataMutation()

  const { enqueueSnackbar } = useSnackbar()

  const methods = useForm<DeleteAllFormType>({
    mode: 'onChange',
  })
  const { reset } = methods

  const handleClose = () => {
    setOpenModalIndex(undefined)
  }

  const handleDelete = () => {
    deleteUserCreatedData()
      .unwrap()
      .then(() => {
        enqueueSnackbar('Данные успешно удалены', { variant: 'info' })
        reset()
        handleClose()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <>
      <Typography variant='h6' sx={{ mt: 4, ml: 4 }}>
        Удалить все данные о работе предприятия
      </Typography>
      <Button variant='error' onClick={() => setOpenModalIndex(1)} sx={{ mt: 2, ml: 4 }}>
        Удалить
      </Button>

      <DeleteDataAlertModal
        open={openModalIndex === 1}
        onNextModal={() => setOpenModalIndex(2)}
        onClose={handleClose}
      />

      <DeleteDataFinalModal
        open={openModalIndex === 2}
        onClose={handleClose}
        methods={methods}
        onSubmit={handleDelete}
        slotProps={{
          backdrop: { transitionDuration: 0 },
        }}
      />
    </>
  )
}
