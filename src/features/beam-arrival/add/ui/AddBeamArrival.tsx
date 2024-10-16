import { FC, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { Box, Button, CircularProgress, Divider, Modal, Typography } from '@mui/material'

import {
  BEAM_DELIVERY_METHOD,
  BeamArrivalFormType,
  useAddBeamArrivalMutation,
} from '@/entities/beam-arrival'
import { getDeliveryMethodText } from '@/entities/beam-arrival/libs/helpers'
import { useFetchBeamSizesByLengthQuery } from '@/entities/beam-in'
import { useFetchAllSuppliersQuery } from '@/entities/supplier'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'
import { FormAutocomplete } from '@/shared/ui/FormAutocomplete'
import { ConfirmCloseModal } from '@/shared/ui/modal'

import { AddBeamArrivalFormItem } from './AddBeamArrivalFormItem'
import { useSnackbar } from 'notistack'

export interface AddWoodsArrivalArrivalProps {
  title: string
  selectedDate: string
}

export const AddBeamArrival: FC<AddWoodsArrivalArrivalProps> = ({ title, selectedDate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isConfirmCloseModalOpen, setConfirmCloseModalOpen] = useState(false)

  const methods = useForm<BeamArrivalFormType>({
    defaultValues: {
      supplierId: undefined,
      deliveryMethod: undefined,
      woodTypeId: undefined,
      length: null,
      beamArrivalItems: [
        {
          volume: null,
          beamSizeId: null,
          amount: null,
        },
      ],
    },
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    getValues,
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

  const watchLength = watch('length')

  const { fields, append, remove } = useFieldArray({ control, name: 'beamArrivalItems' })

  const { enqueueSnackbar } = useSnackbar()

  const [addBeamArrivalMutation, { isLoading: isLoadingBeamArrivalMutation }] =
    useAddBeamArrivalMutation()

  const { data: woodTypes, isLoading: isWoodTypesLoading } = useFetchAllWoodTypesQuery()
  const { data: beamSizes, isLoading: isBeamSizesLoading } = useFetchBeamSizesByLengthQuery(
    { length: watchLength as number },
    { skip: !watchLength }
  )
  const { data: suppliers, isLoading: isSuppliersLoading } = useFetchAllSuppliersQuery()

  const suppliersOptions = useMemo(() => {
    if (!suppliers) {
      return []
    }

    return suppliers.map(supplier => ({ id: supplier.id, label: supplier.name }))
  }, [suppliers])

  const lengthOptions = [
    {
      id: 4,
      label: '4м',
    },
    {
      id: 6,
      label: '6м',
    },
  ]

  const woodTypesOptions = useMemo(() => {
    if (!woodTypes) {
      return []
    }

    return woodTypes.map(woodType => ({ id: woodType.id, label: woodType.name }))
  }, [woodTypes])

  const deliveryMethodOptions = [
    {
      id: BEAM_DELIVERY_METHOD.OWNER_TRANSPORT,
      label: getDeliveryMethodText(BEAM_DELIVERY_METHOD.OWNER_TRANSPORT),
    },
    {
      id: BEAM_DELIVERY_METHOD.SUPPLIER_TRANSPORT,
      label: getDeliveryMethodText(BEAM_DELIVERY_METHOD.SUPPLIER_TRANSPORT),
    },
  ]

  // При изменении длины необходимо сбрасывать диаметр (beamSize), чтобы
  // случайно не отправилась не та длина
  useEffect(() => {
    setValue(
      'beamArrivalItems',
      getValues().beamArrivalItems.map(beamArrivalItem => {
        return { ...beamArrivalItem, beamSizeId: null }
      })
    )
  }, [watchLength])

  const onSubmit: SubmitHandler<BeamArrivalFormType> = ({
    supplierId,
    woodTypeId,
    deliveryMethod,
    length,
    beamArrivalItems,
  }) => {
    const beamArrivalDtos = beamArrivalItems.map(({ volume, amount, beamSizeId }) => {
      return {
        date: selectedDate,
        woodTypeId,
        length: Number(length),
        ...(supplierId ? { supplierId } : {}),
        ...(volume ? { volume: Number(volume) } : {}),
        ...(amount ? { amount: Number(amount) } : {}),
        ...(beamSizeId ? { beamSizeId } : {}),
        ...(deliveryMethod ? { deliveryMethod } : {}),
      }
    })

    addBeamArrivalMutation(beamArrivalDtos)
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

        enqueueSnackbar('Поступления сырья успешно созданы', { variant: 'success' })
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

            <FormAutocomplete
              name='deliveryMethod'
              control={control}
              options={deliveryMethodOptions}
              placeholder={'Способ доставки'}
            />

            {isWoodTypesLoading ? (
              <CircularProgress size={20} />
            ) : (
              <FormAutocomplete
                name='woodTypeId'
                control={control}
                options={woodTypesOptions}
                placeholder={'Порода'}
                rules={{
                  required: 'Порода обязательна',
                }}
              />
            )}

            <FormAutocomplete
              name='length'
              control={control}
              options={lengthOptions}
              placeholder={'Длина'}
              rules={{
                required: 'Длина обязательна',
              }}
            />

            <Divider sx={{ height: '10px', width: '100%', mt: 3, mb: 2 }} />

            {fields.length !== 0 && (
              <>
                <Typography variant='body1'>Бревна.</Typography>
                <Typography variant='body2'>
                  <i>Объем</i> - для баланса.
                </Typography>
                <Typography variant='body2'>
                  <i>Количество и диаметр</i> - для пиловочника.
                </Typography>
              </>
            )}

            {fields.map((field, fieldIndex) => {
              return (
                <AddBeamArrivalFormItem
                  field={field}
                  fieldIndex={fieldIndex}
                  watch={watch}
                  register={register}
                  errors={errors}
                  control={control}
                  remove={remove}
                  isBeamSizesLoading={isBeamSizesLoading}
                  beamSizes={beamSizes}
                />
              )
            })}

            <Button
              onClick={() =>
                append({
                  volume: null,
                  beamSizeId: null,
                  amount: null,
                })
              }
              sx={{ width: '100%' }}
              variant='outlined'
            >
              Добавить
            </Button>

            <ButtonWithLoader
              isLoading={isLoadingBeamArrivalMutation}
              type='submit'
              sx={{ mt: 2, width: '100%' }}
              loaderSx={{
                top: -14,
              }}
            >
              Внести
            </ButtonWithLoader>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
