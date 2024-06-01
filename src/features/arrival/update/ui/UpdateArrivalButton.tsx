import { FC, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { skipToken } from '@reduxjs/toolkit/query'

import { IconButton } from '@mui/material'

import { getDimensionString, useFetchDimensionsByWoodClassQuery } from '@/entities/dimension'
import { UpdateWoodsAmountModal } from '@/entities/wood/ui/UpdateWoodsAmountModal.tsx'
import { useUpdateWoodArrivalMutation } from '@/entities/wood-arrival'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { EditIcon } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export type UpdateArrivalButtonProps = {
  onClick: () => void
  isOpen: boolean
  onClose: () => void
  dimension: string
  woodClass: string
  arrivalId: number
  amount: number
}

export const UpdateArrivalButton: FC<UpdateArrivalButtonProps> = ({
  onClick,
  isOpen,
  onClose,
  amount,
  woodClass,
  dimension,
  arrivalId,
}) => {
  const [updateArrivalMutation, { isLoading: isLoadingUpdateWoodArrivalMutation }] =
    useUpdateWoodArrivalMutation()

  const { data: woodClasses } = useFetchAllWoodClassesQuery()

  const currentWoodClass = useMemo(
    () => woodClasses?.find(item => item.name === woodClass),
    [woodClass, woodClasses]
  )

  const { data: dimensions } = useFetchDimensionsByWoodClassQuery(
    currentWoodClass ? currentWoodClass?.id : skipToken
  )

  const currentDimension = useMemo(
    () => dimensions?.find(item => getDimensionString(item) === dimension),
    [dimension, dimensions]
  )

  const methods = useForm<{ amount: number }>({
    defaultValues: { amount },
  })

  const { enqueueSnackbar } = useSnackbar()

  const handleUpdate: SubmitHandler<{ amount: number }> = values => {
    if (!currentWoodClass || !currentDimension)
      return enqueueSnackbar('Не удалось обновить данные', { variant: 'error' })

    updateArrivalMutation({
      amount: values.amount,
      woodClassId: currentWoodClass.id,
      dimensionId: currentDimension.id,
      arrivalId,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Данные успешно обновлены', { variant: 'success' })
        onClose()
      })
      .catch(error => {
        defaultErrorHandler(error, message =>
          enqueueSnackbar(message, {
            variant: 'error',
          })
        )
      })
  }

  return (
    <>
      <IconButton onClick={onClick}>
        <EditIcon />
      </IconButton>

      <UpdateWoodsAmountModal
        title={'Редактировать'}
        actionTitle={'Редактировать'}
        onSubmit={handleUpdate}
        open={isOpen}
        onClose={onClose}
        methods={methods}
        isLoading={isLoadingUpdateWoodArrivalMutation}
      />
    </>
  )
}
