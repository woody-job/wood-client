import { FC, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { Box, Button, CircularProgress, Divider, Modal, Typography } from '@mui/material'

import { useFetchBeamSizesByLengthQuery } from '@/entities/beam-in'
import { BeamShipmentFormType, useAddBeamShipmentMutation } from '@/entities/beam-shipment'
import { useFetchAllBuyersQuery } from '@/entities/buyer'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'
import { FormAutocomplete } from '@/shared/ui/FormAutocomplete'
import { ConfirmCloseModal } from '@/shared/ui/modal'

import { AddBeamShipmentFormItem } from './AddBeamShipmentFormItem'
import { useSnackbar } from 'notistack'

export interface AddWoodsArrivalShipmentProps {
  title: string
  selectedDate: string
}

export const AddBeamShipment: FC<AddWoodsArrivalShipmentProps> = ({ title, selectedDate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isConfirmCloseModalOpen, setConfirmCloseModalOpen] = useState(false)

  const methods = useForm<BeamShipmentFormType>({
    defaultValues: {
      buyerId: undefined,
      woodTypeId: undefined,
      length: null,
      beamShipmentItems: [
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

  const { fields, append, remove } = useFieldArray({ control, name: 'beamShipmentItems' })

  const { enqueueSnackbar } = useSnackbar()

  const [addBeamShipmentMutation, { isLoading: isLoadingBeamShipmentMutation }] =
    useAddBeamShipmentMutation()

  const { data: woodTypes, isLoading: isWoodTypesLoading } = useFetchAllWoodTypesQuery()
  const { data: beamSizes, isLoading: isBeamSizesLoading } = useFetchBeamSizesByLengthQuery(
    { length: watchLength as number },
    { skip: !watchLength }
  )
  const { data: buyers, isLoading: isBuyersLoading } = useFetchAllBuyersQuery()

  const buyersOptions = useMemo(() => {
    if (!buyers) {
      return []
    }

    return buyers.map(buyer => ({ id: buyer.id, label: buyer.name }))
  }, [buyers])

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

  // При изменении длины необходимо сбрасывать диаметр (beamSize), чтобы
  // случайно не отправилась не та длина
  useEffect(() => {
    setValue(
      'beamShipmentItems',
      getValues().beamShipmentItems.map(beamShipmentItem => {
        return { ...beamShipmentItem, beamSizeId: null }
      })
    )
  }, [watchLength])

  const onSubmit: SubmitHandler<BeamShipmentFormType> = ({
    buyerId,
    woodTypeId,
    length,
    beamShipmentItems,
  }) => {
    const beamShipmentDtos = beamShipmentItems.map(({ volume, amount, beamSizeId }) => {
      return {
        date: selectedDate,
        woodTypeId,
        length: Number(length),
        ...(buyerId ? { buyerId } : {}),
        ...(volume ? { volume: Number(volume) } : {}),
        ...(amount ? { amount: Number(amount) } : {}),
        ...(beamSizeId ? { beamSizeId } : {}),
      }
    })

    addBeamShipmentMutation(beamShipmentDtos)
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

        enqueueSnackbar('Отгрузки сырья успешно созданы', { variant: 'success' })
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
                <AddBeamShipmentFormItem
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
              isLoading={isLoadingBeamShipmentMutation}
              type='submit'
              sx={{ mt: 2, width: '100%' }}
              loaderSx={{
                top: -14,
              }}
            >
              Отгрузить
            </ButtonWithLoader>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
