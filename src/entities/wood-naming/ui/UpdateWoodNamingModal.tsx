import { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { CircularProgress, MenuItem, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { WoodNamingFormType } from '@/entities/wood-naming'
import { WoodType } from '@/entities/wood-type'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

export interface UpdateWoodNamingModalProps extends Omit<ModalProps, 'children'> {
  onUpdate: SubmitHandler<WoodNamingFormType>
  action: string
  title: string
  methods: UseFormReturn<WoodNamingFormType>
  isLoading: boolean
  woodTypes: WoodType[] | undefined
  isWoodTypesLoading: boolean
}

export const UpdateWoodNamingModal: FC<UpdateWoodNamingModalProps> = ({
  onUpdate,
  action,
  title,
  methods,
  isLoading,
  woodTypes,
  isWoodTypesLoading,
  ...modalProps
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = methods

  const watchWoodTypeId = watch('woodTypeId')

  return (
    <Modal {...modalProps}>
      <ModalContent
        component='form'
        display='flex'
        flexDirection='column'
        onSubmit={handleSubmit(onUpdate)}
        gap={1}
      >
        <Typography textAlign='center' sx={{ mb: 3 }} variant='h6'>
          {title}
        </Typography>

        <TextField
          inputProps={{ ...register('name', { required: true }) }}
          id='name'
          label='Название'
          variant='outlined'
          size='small'
        />
        {errors.name?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Название обязательно
          </Typography>
        )}

        <TextField
          inputProps={{ ...register('minDiameter') }}
          id='name'
          label='Мин. диаметр, см'
          variant='outlined'
          size='small'
          type='number'
        />

        <TextField
          inputProps={{ ...register('maxDiameter') }}
          id='name'
          label='Макс. диаметр, см'
          variant='outlined'
          size='small'
          type='number'
        />

        <TextField
          inputProps={{ ...register('length', { required: true }) }}
          id='name'
          label='Длина'
          variant='outlined'
          size='small'
          type='number'
        />
        {errors.length?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Длина обязательна
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

        <ButtonWithLoader
          isLoading={isLoading}
          type='submit'
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
        >
          {action}
        </ButtonWithLoader>
      </ModalContent>
    </Modal>
  )
}
