import { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  ModalProps,
  TextField,
  Typography,
} from '@mui/material'

import { BeamInFormType } from '@/entities/beam-in/model'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

export interface UpdateInputWoodModalProps extends Omit<ModalProps, 'children'> {
  title: string
  action: string
  onUpdate: SubmitHandler<BeamInFormType>
  methods: UseFormReturn<BeamInFormType>
  beamSizesOptions:
    | {
        id: number
        name: number
      }[]
    | undefined
  isLoadingBeamSizes: boolean
  isLoading: boolean
}

export const UpdateInputWoodModal: FC<UpdateInputWoodModalProps> = ({
  title,
  action,
  onUpdate,
  methods,
  beamSizesOptions,
  isLoadingBeamSizes,
  isLoading,
  ...modalProps
}) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods

  const watchDiameter = watch('diameter')

  const diameterSelect = (
    <>
      {isLoadingBeamSizes ? (
        <CircularProgress size={15} />
      ) : (
        <Box
          sx={{
            position: 'relative',
            ...(!watchDiameter
              ? {
                  '&::before': {
                    position: 'absolute',
                    content: '"Диаметр"',
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
            inputProps={{ ...register('diameter', { required: true }) }}
            select
            defaultValue={watchDiameter}
            sx={{ width: '100%' }}
            size='small'
            error={Boolean(errors.diameter)}
          >
            {beamSizesOptions?.map(beamSizeOption => {
              return <MenuItem value={beamSizeOption.name}>{beamSizeOption.name}</MenuItem>
            })}
          </TextField>
        </Box>
      )}
      {errors.diameter?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Диаметр обязателен
        </Typography>
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

        {action !== 'Изменить' && diameterSelect}

        <TextField
          label='Количество'
          inputProps={{ ...register('amount', { required: true }) }}
          variant='outlined'
          error={Boolean(errors.amount)}
        />
        {errors.amount?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Количество обязательно
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
