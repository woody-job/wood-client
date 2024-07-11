import { FC, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { skipToken } from '@reduxjs/toolkit/query'

import { Button, CircularProgress, MenuItem, Modal, TextField, Typography } from '@mui/material'

import { useFetchAllBuyersQuery } from '@/entities/buyer'
import {
  getDimensionString,
  useFetchAllDimensionsQuery,
  useFetchDimensionsByWoodClassQuery,
} from '@/entities/dimension'
import { useFetchAllPersonsInChargeQuery } from '@/entities/personInCharge'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { ShipmentFormType, useAddWoodShipmentMutation } from '@/entities/wood-shipment'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { defaultErrorHandler, getUniqueDimensionsFromAllDimensions } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

import { useSnackbar } from 'notistack'

export interface AddWoodsArrivalShipmentProps {
  title: string
  woodConditionId: number
  selectedDate: string
}

export const AddWoodsShipment: FC<AddWoodsArrivalShipmentProps> = ({
  title,
  woodConditionId,
  selectedDate,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  const methods = useForm<ShipmentFormType>()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods

  const watchWoodClassId = watch('woodClassId')

  const { enqueueSnackbar } = useSnackbar()

  const [addWoodShipmentMutation, { isLoading: isLoadingAddWoodShipmentMutation }] =
    useAddWoodShipmentMutation()

  const { data: woodClasses, isLoading: isWoodClassesLoading } = useFetchAllWoodClassesQuery()

  const { data: dimensions, isLoading: isDimensionsLoading } = useFetchDimensionsByWoodClassQuery(
    watchWoodClassId ?? skipToken
  )
  const { data: allDimensions } = useFetchAllDimensionsQuery()
  const { data: woodTypes, isLoading: isWoodTypesLoading } = useFetchAllWoodTypesQuery()
  const { data: buyers, isLoading: isBuyersLoading } = useFetchAllBuyersQuery()
  const { data: personsInCharge, isLoading: isPersonsInChargeLoading } =
    useFetchAllPersonsInChargeQuery()

  const dimensionForSaleOptions = useMemo(() => {
    if (!allDimensions) {
      return []
    }

    return getUniqueDimensionsFromAllDimensions(allDimensions)
  }, [allDimensions])

  const onSubmit: SubmitHandler<ShipmentFormType> = ({
    buyerId,
    personInChargeId,
    dimensionForSaleId,
    car,
    ...values
  }) => {
    addWoodShipmentMutation({
      ...values,
      ...(buyerId ? { buyerId } : {}),
      ...(personInChargeId ? { personInChargeId } : {}),
      ...(dimensionForSaleId ? { dimensionForSaleId } : {}),
      ...(car ? { car } : {}),
      woodConditionId,
      date: selectedDate,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Доски на отгрузку успешно добавлены', { variant: 'success' })
        reset()
        handleClose()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen])

  return (
    <>
      <Button size='small' onClick={handleOpen}>
        Добавить
      </Button>

      <Modal open={isOpen} onClose={handleClose}>
        <ModalContent
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          display='flex'
          flexDirection='column'
          gap={1}
        >
          <Typography variant='h6' component='h2' sx={{ mb: 3 }}>
            {title}
          </Typography>

          {isBuyersLoading ? (
            <CircularProgress size={20} />
          ) : (
            <TextField select label='Покупатель' inputProps={{ ...register('buyerId') }}>
              {buyers?.map(buyer => (
                <MenuItem key={buyer.id} value={buyer.id}>
                  {buyer.name}
                </MenuItem>
              ))}
            </TextField>
          )}

          {isPersonsInChargeLoading ? (
            <CircularProgress size={20} />
          ) : (
            <TextField
              select
              label='Ответственный'
              inputProps={{ ...register('personInChargeId') }}
            >
              {personsInCharge?.map(personInCharge => (
                <MenuItem key={personInCharge.id} value={personInCharge.id}>
                  {personInCharge.initials} {personInCharge.secondName}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            label='Машина'
            variant='outlined'
            type='string'
            inputProps={{ ...register('car') }}
          />

          {isWoodClassesLoading ? (
            <CircularProgress size={20} />
          ) : (
            <TextField
              select
              label='Сорт'
              inputProps={{ ...register('woodClassId', { required: true }) }}
            >
              {woodClasses?.map(woodClass => (
                <MenuItem key={woodClass.id} value={woodClass.id}>
                  {woodClass.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          {errors.woodClassId?.type === 'required' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Порода обязательна
            </Typography>
          )}

          {isDimensionsLoading ? (
            <CircularProgress size={20} />
          ) : (
            <TextField
              select
              label='Сечение'
              inputProps={{ ...register('dimensionId', { required: true }) }}
            >
              {watchWoodClassId ? (
                dimensions?.map(dimension => (
                  <MenuItem key={dimension.id} value={dimension.id}>
                    {getDimensionString(dimension)}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Выберите сорт</MenuItem>
              )}
            </TextField>
          )}
          {errors.dimensionId?.type === 'required' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Сечение обязательно
            </Typography>
          )}

          {isDimensionsLoading ? (
            <CircularProgress size={20} />
          ) : (
            <TextField
              select
              label='Сечение для продажи'
              inputProps={{ ...register('dimensionForSaleId') }}
            >
              {dimensionForSaleOptions?.map(dimension => (
                <MenuItem key={dimension.id} value={dimension.id}>
                  {dimension.name}
                </MenuItem>
              ))}
            </TextField>
          )}

          {isWoodTypesLoading ? (
            <CircularProgress size={20} />
          ) : (
            <TextField
              select
              label='Порода'
              inputProps={{ ...register('woodTypeId', { required: true }) }}
            >
              {woodTypes?.map(woodType => (
                <MenuItem key={woodType.id} value={woodType.id}>
                  {woodType.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          {errors.woodTypeId?.type === 'required' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Порода обязательна
            </Typography>
          )}

          <TextField
            label='Количество'
            inputProps={{ ...register('amount', { required: true, valueAsNumber: true }) }}
          />
          <ButtonWithLoader
            isLoading={isLoadingAddWoodShipmentMutation}
            type='submit'
            sx={{ mt: 2 }}
          >
            Добавить
          </ButtonWithLoader>
        </ModalContent>
      </Modal>
    </>
  )
}
