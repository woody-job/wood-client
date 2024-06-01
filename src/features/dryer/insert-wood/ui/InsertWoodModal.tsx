import { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { CircularProgress, MenuItem, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { Dimension, getDimensionString } from '@/entities/dimension'
import { DryerBringInFormType } from '@/entities/dryer'
import { WoodClass } from '@/entities/wood-class'
import { WoodType } from '@/entities/wood-type'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

export type InsertWoodModalProps = Omit<ModalProps, 'children'> & {
  dimensions: Dimension[] | undefined
  onSubmitForm: SubmitHandler<DryerBringInFormType>
  isDimensionsLoading: boolean
  isWoodClassesLoading: boolean
  isWoodTypesLoading: boolean
  methods: UseFormReturn<DryerBringInFormType>
  woodClasses: WoodClass[] | undefined
  woodTypes: WoodType[] | undefined
  isLoading: boolean
}

export const InsertWoodModal: FC<InsertWoodModalProps> = props => {
  const {
    onSubmitForm,
    methods,
    woodClasses,
    isWoodClassesLoading,
    dimensions,
    isDimensionsLoading,
    woodTypes,
    isWoodTypesLoading,
    isLoading,
    ...modalProps
  } = props

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = methods
  const watchWoodClassId = watch('woodClassId')

  return (
    <Modal {...modalProps} aria-labelledby='create-user-modal-title'>
      <ModalContent
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '.MuiFormControl-root, .MuiCircularProgress-root': {
            mt: 2,
          },
        }}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <Typography
          id='create-user-modal-title'
          variant='h5'
          component='h2'
          sx={{ textAlign: 'center', mb: 2 }}
        >
          Внести доски
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
          sx={{ mt: 4 }}
          loaderSx={{ top: -14 }}
          variant='contained'
          color='primary'
        >
          Внести
        </ButtonWithLoader>
      </ModalContent>
    </Modal>
  )
}
