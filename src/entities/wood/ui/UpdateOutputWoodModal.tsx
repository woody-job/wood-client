import { FC, useMemo } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { CircularProgress, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { Dimension, getDimensionString } from '@/entities/dimension'
import { WoodClass } from '@/entities/wood-class'
import { WoodType } from '@/entities/wood-type'
import { WorkshopOutFormType } from '@/entities/workshop-out/model'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'
import { FormAutocomplete } from '@/shared/ui/FormAutocomplete'

export interface UpdateOutputWoodModalProps extends Omit<ModalProps, 'children'> {
  title: string
  action: string
  onUpdate: SubmitHandler<WorkshopOutFormType>
  dimensions: Dimension[] | undefined
  isDimensionsLoading: boolean
  isWoodClassesLoading: boolean
  isWoodTypesLoading: boolean
  methods: UseFormReturn<WorkshopOutFormType>
  woodClasses: WoodClass[] | undefined
  woodTypes: WoodType[] | undefined
  isLoading: boolean
}

export const UpdateOutputWoodModal: FC<UpdateOutputWoodModalProps> = ({
  title,
  action,
  onUpdate,
  dimensions,
  isDimensionsLoading,
  isWoodClassesLoading,
  isWoodTypesLoading,
  methods,
  woodClasses,
  woodTypes,
  isLoading,
  ...modalProps
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods

  const woodClassesOptions = useMemo(() => {
    if (!woodClasses) {
      return []
    }

    return woodClasses.map(woodClass => ({ id: woodClass.id, label: woodClass.name }))
  }, [woodClasses])

  const dimensionsOptions = useMemo(() => {
    if (!dimensions) {
      return []
    }

    return dimensions.map(dimension => ({
      id: dimension.id,
      label: getDimensionString(dimension),
      width: `${dimension.width}`,
    }))
  }, [dimensions])

  const woodTypesOptions = useMemo(() => {
    if (!woodTypes) {
      return []
    }

    return woodTypes.map(woodType => ({ id: woodType.id, label: woodType.name }))
  }, [woodTypes])

  const createFields = (
    <>
      {isWoodClassesLoading ? (
        <CircularProgress size={20} />
      ) : (
        <FormAutocomplete
          name={'woodClassId'}
          control={control}
          options={woodClassesOptions}
          placeholder={'Сорт'}
          rules={{
            required: 'Сорт обязателен',
          }}
        />
      )}

      {isDimensionsLoading ? (
        <CircularProgress size={20} />
      ) : (
        <FormAutocomplete
          groupBy={option => option.width}
          name={`dimensionId`}
          control={control}
          options={dimensionsOptions}
          placeholder={'Сечение'}
          rules={{
            required: 'Сечение обязательно',
          }}
        />
      )}

      {isWoodTypesLoading ? (
        <CircularProgress size={20} />
      ) : (
        <FormAutocomplete
          name={'woodTypeId'}
          control={control}
          options={woodTypesOptions}
          placeholder={'Порода'}
          rules={{
            required: 'Порода обязательна',
          }}
        />
      )}
    </>
  )

  return (
    <Modal {...modalProps}>
      <ModalContent
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={handleSubmit(onUpdate)}
      >
        <Typography variant='h5' component='h2' sx={{ textAlign: 'center', mb: 5 }}>
          {title}
        </Typography>

        {action !== 'Изменить' && createFields}

        <TextField
          label='Количество'
          variant='outlined'
          type='number'
          inputProps={{ ...register('amount', { required: true, valueAsNumber: true }) }}
        />
        {errors.amount?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Количество не может быть пустым
          </Typography>
        )}

        <ButtonWithLoader
          isLoading={isLoading}
          type='submit'
          sx={{ mt: 5 }}
          variant='contained'
          color='primary'
        >
          {action}
        </ButtonWithLoader>
      </ModalContent>
    </Modal>
  )
}
