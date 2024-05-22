import { FC, FormEventHandler } from 'react'

import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  ModalProps,
  Select,
  TextField,
  Typography,
} from '@mui/material'

import { ModalContent } from '@/shared/ui'
import { DimensionFormType } from '../model'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

export interface UpdateDimensionModalProps extends Omit<ModalProps, 'children'> {
  title: string
  action: string
  onUpdate: SubmitHandler<DimensionFormType>
  methods: UseFormReturn<DimensionFormType>
  woodClassesOptions:
    | {
        id: number
        name: string
      }[]
    | undefined
  isWoodClassesLoading: boolean
}

export const UpdateDimensionModal: FC<UpdateDimensionModalProps> = ({
  title,
  action,
  onUpdate,
  methods,
  woodClassesOptions,
  isWoodClassesLoading,
  ...modalProps
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods

  const watchWoodClass = watch('woodClass')

  return (
    <Modal {...modalProps}>
      <ModalContent
        component='form'
        onSubmit={handleSubmit(onUpdate)}
        display='flex'
        flexDirection='column'
        gap={3}
      >
        <Typography variant='h5' sx={{ textAlign: 'center', mb: 1 }}>
          {title}
        </Typography>

        <TextField
          inputProps={{ ...register('width', { required: true }) }}
          type='number'
          label='Ширина (мм)'
          size='small'
          error={Boolean(errors.width)}
        />
        {errors.width?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Ширина обязательна
          </Typography>
        )}

        <TextField
          inputProps={{ ...register('thickness', { required: true }) }}
          type='number'
          label='Толщина (мм)'
          size='small'
          error={Boolean(errors.thickness)}
        />
        {errors.thickness?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Толщина обязательна
          </Typography>
        )}

        <TextField
          inputProps={{ ...register('length', { required: true }) }}
          type='number'
          label='Длина (м)'
          size='small'
          error={Boolean(errors.length)}
        />
        {errors.length?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Длина обязательна
          </Typography>
        )}

        {isWoodClassesLoading ? (
          <CircularProgress size={15} />
        ) : (
          <Box
            sx={{
              position: 'relative',
              ...(!watchWoodClass
                ? {
                    '&::before': {
                      position: 'absolute',
                      content: '"Сорт"',
                      top: 7,
                      left: 15,
                      color: theme =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey['700']
                          : theme.palette.grey['400'],
                    },
                  }
                : {}),
            }}
          >
            <TextField
              inputProps={{ ...register('woodClass', { required: true }) }}
              select
              defaultValue={watchWoodClass}
              sx={{ width: '100%' }}
              size='small'
              error={Boolean(errors.woodClass)}
            >
              {woodClassesOptions?.map(woodClassOption => {
                return <MenuItem value={woodClassOption.name}>{woodClassOption.name}</MenuItem>
              })}
            </TextField>
          </Box>
        )}
        {errors.woodClass?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Сорт обязателен
          </Typography>
        )}

        <Button type='submit' variant='contained'>
          {action}
        </Button>
      </ModalContent>
    </Modal>
  )
}
