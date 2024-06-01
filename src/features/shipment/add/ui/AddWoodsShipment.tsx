import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { skipToken } from '@reduxjs/toolkit/query'

import { Button, CircularProgress, MenuItem, Modal, TextField, Typography } from '@mui/material'

import { getDimensionString, useFetchDimensionsByWoodClassQuery } from '@/entities/dimension'
import { ArrivalFormType } from '@/entities/wood-arrival'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { useAddWoodShipmentMutation } from '@/entities/wood-shipment'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ModalContent } from '@/shared/ui'

import { useSnackbar } from 'notistack'
import { ButtonWithLoader } from '@/shared/ui/button'

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

  const methods = useForm<ArrivalFormType>()
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
  const { data: woodTypes, isLoading: isWoodTypesLoading } = useFetchAllWoodTypesQuery()

  const onSubmit: SubmitHandler<ArrivalFormType> = values => {
    addWoodShipmentMutation({
      ...values,
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
