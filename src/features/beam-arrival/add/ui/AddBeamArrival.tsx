import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material'

import {
  BEAM_DELIVERY_METHOD,
  BeamArrivalFormType,
  useAddBeamArrivalMutation,
} from '@/entities/beam-arrival'
import { useFetchBeamSizesByLengthQuery } from '@/entities/beam-in'
import { getDeliveryMethodText } from '@/entities/beam-in/libs/helpers'
import { useFetchAllSuppliersQuery } from '@/entities/supplier'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

import { AddBeamArrivalFormItem } from './AddBeamArrivalFormItem'
import { useSnackbar } from 'notistack'

export interface AddWoodsArrivalArrivalProps {
  title: string
  selectedDate: string
}

export const AddBeamArrival: FC<AddWoodsArrivalArrivalProps> = ({ title, selectedDate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

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
    formState: { errors },
  } = methods

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

  const lengthOptions = [
    {
      id: 4,
      name: '4м',
    },
    {
      id: 6,
      name: '6м',
    },
  ]

  const deliveryMethodOptions = [
    {
      id: BEAM_DELIVERY_METHOD.OWNER_TRANSPORT,
      name: getDeliveryMethodText(BEAM_DELIVERY_METHOD.OWNER_TRANSPORT),
    },
    {
      id: BEAM_DELIVERY_METHOD.SUPPLIER_TRANSPORT,
      name: getDeliveryMethodText(BEAM_DELIVERY_METHOD.SUPPLIER_TRANSPORT),
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
      }
    })

    addBeamArrivalMutation(beamArrivalDtos)
      .unwrap()
      .then(errors => {
        reset()
        handleClose()

        if (errors.length) {
          errors.forEach(error => {
            enqueueSnackbar(error, { variant: 'info' })
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
              <TextField select label='Поставщик' inputProps={{ ...register('supplierId') }}>
                {suppliers?.map(supplier => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </TextField>
            )}

            <TextField
              select
              label='Способ доставки'
              inputProps={{ ...register('deliveryMethod') }}
            >
              {deliveryMethodOptions?.map(deliveryMethodOption => (
                <MenuItem key={deliveryMethodOption.id} value={deliveryMethodOption.id}>
                  {deliveryMethodOption.name}
                </MenuItem>
              ))}
            </TextField>

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
              select
              label='Длина'
              inputProps={{ ...register('length', { required: true }) }}
            >
              {lengthOptions?.map(lengthOption => (
                <MenuItem key={lengthOption.id} value={lengthOption.id}>
                  {lengthOption.name}
                </MenuItem>
              ))}
            </TextField>
            {errors.length?.type === 'required' && (
              <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
                Длина обязательна
              </Typography>
            )}

            <Divider sx={{ height: '10px', width: '100%', mt: 3, mb: 2 }} />

            <Typography variant='body1'>Бревна.</Typography>
            <Typography variant='body2'>
              <i>Объем</i> - для баланса.
            </Typography>
            <Typography variant='body2'>
              <i>Количество и диаметр</i> - для пиловочника.
            </Typography>

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
