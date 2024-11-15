import { FC, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { Box, Button, CircularProgress, Divider, Modal, TextField, Typography } from '@mui/material'

import { useFetchAllBuyersQuery } from '@/entities/buyer'
import { useFetchAllDimensionsQuery } from '@/entities/dimension'
import { useFetchAllPersonsInChargeQuery } from '@/entities/personInCharge'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { ShipmentFormType, useAddWoodShipmentMutation } from '@/entities/wood-shipment'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'
import { FormAutocomplete } from '@/shared/ui/FormAutocomplete'
import { ConfirmCloseModal } from '@/shared/ui/modal'

import { AddWoodShipmentFormItem } from './AddWoodShipmentFormItem'
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
  const [isConfirmCloseModalOpen, setConfirmCloseModalOpen] = useState(false)

  const methods = useForm<ShipmentFormType>({
    defaultValues: {
      buyerId: undefined,
      personInChargeId: undefined,
      car: undefined,
      woodShipmentItems: [
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

  const { fields, append, remove } = useFieldArray({ control, name: 'woodShipmentItems' })

  const { enqueueSnackbar } = useSnackbar()

  const [addWoodShipmentMutation, { isLoading: isLoadingAddWoodShipmentMutation }] =
    useAddWoodShipmentMutation()

  const { data: woodClasses, isLoading: isWoodClassesLoading } = useFetchAllWoodClassesQuery()

  const { data: allDimensions } = useFetchAllDimensionsQuery()
  const { data: woodTypes, isLoading: isWoodTypesLoading } = useFetchAllWoodTypesQuery()
  const { data: buyers, isLoading: isBuyersLoading } = useFetchAllBuyersQuery()
  const { data: personsInCharge, isLoading: isPersonsInChargeLoading } =
    useFetchAllPersonsInChargeQuery()

  const buyersOptions = useMemo(() => {
    if (!buyers) {
      return []
    }

    return buyers.map(buyer => ({ id: buyer.id, label: buyer.name }))
  }, [buyers])

  const personsInChargeOptions = useMemo(() => {
    if (!personsInCharge) {
      return []
    }

    return personsInCharge.map(personInCharge => ({
      id: personInCharge.id,
      label: `${personInCharge.initials} ${personInCharge.secondName}`,
    }))
  }, [personsInCharge])

  const onSubmit: SubmitHandler<ShipmentFormType> = ({
    buyerId,
    personInChargeId,
    car,
    woodShipmentItems,
  }) => {
    const woodShipmentDtos = woodShipmentItems.map(
      ({ dimensionId, dimensionForSaleId, woodClassId, woodTypeId, amount }) => {
        return {
          date: selectedDate,
          woodConditionId,
          dimensionId,
          woodClassId,
          woodTypeId,
          amount,

          ...(buyerId ? { buyerId } : {}),
          ...(personInChargeId ? { personInChargeId } : {}),
          ...(dimensionForSaleId ? { dimensionForSaleId } : {}),
          ...(car ? { car } : {}),
        }
      }
    )

    addWoodShipmentMutation(woodShipmentDtos)
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

        enqueueSnackbar('Доски на отгрузку успешно добавлены', { variant: 'success' })
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

            {isBuyersLoading ? (
              <CircularProgress size={20} />
            ) : (
              <FormAutocomplete
                name='buyerId'
                control={control}
                options={buyersOptions}
                placeholder={'Покупатель'}
              />
            )}

            {isPersonsInChargeLoading ? (
              <CircularProgress size={20} />
            ) : (
              <FormAutocomplete
                name='personInChargeId'
                control={control}
                options={personsInChargeOptions}
                placeholder={'Ответственный'}
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
                <AddWoodShipmentFormItem
                  field={field}
                  fieldIndex={fieldIndex}
                  watch={watch}
                  control={control}
                  register={register}
                  errors={errors}
                  remove={remove}
                  woodClasses={woodClasses}
                  isWoodClassesLoading={isWoodClassesLoading}
                  woodTypes={woodTypes}
                  isWoodTypesLoading={isWoodTypesLoading}
                  allDimensions={allDimensions}
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
              isLoading={isLoadingAddWoodShipmentMutation}
              type='submit'
              sx={{ mt: 2 }}
            >
              Отгрузить
            </ButtonWithLoader>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
