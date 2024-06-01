import { FC, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { skipToken } from '@reduxjs/toolkit/query'

import { IconButton } from '@mui/material'

import { getDimensionString, useFetchDimensionsByWoodClassQuery } from '@/entities/dimension'
import { UpdateWoodsAmountModal } from '@/entities/wood/ui/UpdateWoodsAmountModal.tsx'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { useUpdateWoodShipmentMutation } from '@/entities/wood-shipment'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { EditIcon } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export type UpdateShipmentButtonProps = {
  onClick: () => void
  isOpen: boolean
  onClose: () => void
  dimension: string
  woodClass: string
  shipmentId: number
  amount: number
}

export const UpdateShipmentButton: FC<UpdateShipmentButtonProps> = ({
  onClick,
  isOpen,
  onClose,
  woodClass,
  dimension,
  shipmentId,
  amount,
}) => {
  const [updateShipmentMutation, { isLoading: isLoadingUpdateShipmentMutation }] =
    useUpdateWoodShipmentMutation()
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

    updateShipmentMutation({
      amount: values.amount,
      woodClassId: currentWoodClass.id,
      dimensionId: currentDimension.id,
      shipmentId,
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
        isLoading={isLoadingUpdateShipmentMutation}
      />
    </>
  )
}
