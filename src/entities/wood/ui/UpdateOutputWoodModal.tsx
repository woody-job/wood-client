import { FC, FormEventHandler, useEffect } from 'react'

import {
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  ModalProps,
  TextField,
  Typography,
} from '@mui/material'

import { ModalContent } from '@/shared/ui'
import { Dimension, getDimensionString } from '@/entities/dimension'
import { DryerBringInFormType } from '@/entities/dryer'
import { WoodClass } from '@/entities/wood-class'
import { WoodType } from '@/entities/wood-type'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { WorkshopOutFormType } from '@/entities/workshop-out/model'

export interface UpdateOutputWoodModalProps extends Omit<ModalProps, 'children'> {
  title: string
  action: string
  onUpdate: SubmitHandler<WorkshopOutFormType>
  dimensions: Dimension[] | undefined
  isDimensionsLoading: boolean
  isWoodClassesLoading: boolean
  isWoodTypesLoading: boolean
  methods: UseFormReturn<DryerBringInFormType>
  woodClasses: WoodClass[] | undefined
  woodTypes: WoodType[] | undefined
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
  ...modalProps
}) => {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = methods

  const watchWoodClassId = watch('woodClassId')
  const watchDimensionId = watch('dimensionId')
  const watchWoodTypeId = watch('woodTypeId')

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

        {isWoodClassesLoading ? (
          <CircularProgress size={20} />
        ) : (
          <TextField
            select
            label='Сорт'
            inputProps={{ ...register('woodClassId', { required: true }) }}
            defaultValue={watchWoodClassId}
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
            defaultValue={watchDimensionId}
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
            defaultValue={watchWoodTypeId}
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

        <Button type='submit' sx={{ mt: 5 }} variant='contained' color='primary'>
          {action}
        </Button>
      </ModalContent>
    </Modal>
  )
}
