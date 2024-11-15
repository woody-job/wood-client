import { FC, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { Box, Button, CircularProgress, Divider, Modal, TextField, Typography } from '@mui/material'

import { useFetchAllSuppliersQuery } from '@/entities/supplier'
import { ArrivalFormType, useAddWoodArrivalMutation } from '@/entities/wood-arrival'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'
import { FormAutocomplete } from '@/shared/ui/FormAutocomplete'
import { ConfirmCloseModal } from '@/shared/ui/modal'

import { AddWoodArrivalFormItem } from './AddWoodArrivalFormItem'
import { useSnackbar } from 'notistack'

export interface AddWoodsArrivalShipmentProps {
  title: string
  woodConditionId: number
  selectedDate: string
}

export const AddWoodsArrival: FC<AddWoodsArrivalShipmentProps> = ({
  title,
  woodConditionId,
  selectedDate,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isConfirmCloseModalOpen, setConfirmCloseModalOpen] = useState(false)

  const methods = useForm<ArrivalFormType>({
    defaultValues: {
      supplierId: undefined,
      car: undefined,
      woodArrivalItems: [
        {
          amount: undefined,
          woodClassId: undefined,
          woodTypeId: undefined,
          dimensionId: undefined,
        },
      ],
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isDirty },
  } = methods

  const handleOpenConfirmModal = () => {
    setConfirmCloseModalOpen(true)
  }

  const handleCloseConfirmModal = () => {
    setConfirmCloseModalOpen(false)
  }

  const handleSubmitConfirmModal = () => {
    setConfirmCloseModalOpen(false)
    setIsOpen(false)
  }

  const handleClose = ({ avoidConfirm = false }: { avoidConfirm?: boolean }) => {
    if (avoidConfirm) {
      setIsOpen(false)

      return
    }

    if (isDirty) {
      handleOpenConfirmModal()

      return
    }

    setIsOpen(false)
  }

  const handleOpen = () => setIsOpen(true)

  const { fields, append, remove } = useFieldArray({ control, name: 'woodArrivalItems' })

  const { enqueueSnackbar } = useSnackbar()

  const [addWoodArrivalMutation, { isLoading: isLoadingAddWoodArrivalMutation }] =
    useAddWoodArrivalMutation()
  const { data: woodClasses, isLoading: isWoodClassesLoading } = useFetchAllWoodClassesQuery()

  const { data: woodTypes, isLoading: isWoodTypesLoading } = useFetchAllWoodTypesQuery()
  const { data: suppliers, isLoading: isSuppliersLoading } = useFetchAllSuppliersQuery()

  const suppliersOptions = useMemo(() => {
    if (!suppliers) {
      return []
    }

    return suppliers.map(supplier => ({ id: supplier.id, label: supplier.name }))
  }, [suppliers])

  const onSubmit: SubmitHandler<ArrivalFormType> = ({ supplierId, car, woodArrivalItems }) => {
    const woodArrivalDtos = woodArrivalItems.map(
      ({ dimensionId, woodClassId, woodTypeId, amount }) => {
        return {
          date: selectedDate,
          woodConditionId,
          dimensionId,
          woodClassId,
          woodTypeId,
          amount,

          ...(supplierId ? { supplierId } : {}),
          ...(car ? { car } : {}),
        }
      }
    )

    addWoodArrivalMutation(woodArrivalDtos)
      .unwrap()
      .then(errors => {
        reset()
        handleClose({ avoidConfirm: true })

        if (errors.length) {
          errors.forEach(error => {
            enqueueSnackbar(error, { variant: 'error' })
          })

          return
        }

        enqueueSnackbar('Доски на поступления успешно добавлены', { variant: 'success' })
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

      <ConfirmCloseModal
        isConfirmCloseModalOpen={isConfirmCloseModalOpen}
        handleSubmitConfirmModal={handleSubmitConfirmModal}
        handleCloseConfirmModal={handleCloseConfirmModal}
        title='Закрытие формы'
        description='В форме есть несохраненные данные. Вы точно хотите закрыть?'
      />

      <Modal open={isOpen} onClose={handleClose}>
        <ModalContent
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          display='flex'
          flexDirection='column'
          sx={{
            display: 'flex',
            width: 510,
            maxHeight: '90vh',
            flexDirection: 'column',
            '.MuiFormControl-root, .MuiCircularProgress-root': {
              mt: 2,
            },
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              width: 505,
              overflowY: 'scroll',
              pr: 0.5,
              px: 3,
              pb: 1,
            }}
          >
            <Typography variant='h6' component='h2' sx={{ mb: 3 }}>
              {title}
            </Typography>

            <Typography variant='body1'>Общая информация о партии:</Typography>

            {isSuppliersLoading ? (
              <CircularProgress size={20} />
            ) : (
              <FormAutocomplete
                name='supplierId'
                control={control}
                options={suppliersOptions}
                placeholder={'Поставщик'}
              />
            )}

            <TextField
              label='Машина'
              variant='outlined'
              type='string'
              inputProps={{ ...register('car') }}
            />

            <Divider sx={{ height: '10px', width: '100%', mt: 3, mb: 2 }} />

            {fields.length !== 0 && <Typography variant='body1'>Доски.</Typography>}

            {fields.map((field, fieldIndex) => {
              return (
                <AddWoodArrivalFormItem
                  field={field}
                  control={control}
                  fieldIndex={fieldIndex}
                  watch={watch}
                  register={register}
                  errors={errors}
                  remove={remove}
                  woodClasses={woodClasses}
                  isWoodClassesLoading={isWoodClassesLoading}
                  woodTypes={woodTypes}
                  isWoodTypesLoading={isWoodTypesLoading}
                />
              )
            })}

            <Button
              onClick={() =>
                append({
                  amount: undefined,
                  woodClassId: undefined,
                  woodTypeId: undefined,
                  dimensionId: undefined,
                })
              }
              sx={{ width: '100%' }}
              variant='outlined'
            >
              Добавить
            </Button>

            <ButtonWithLoader
              isLoading={isLoadingAddWoodArrivalMutation}
              type='submit'
              sx={{ mt: 2 }}
            >
              Внести
            </ButtonWithLoader>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
