import { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Button, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { DryerFormType } from '@/entities/dryer'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

export interface UpdateDryerModalProps extends Omit<ModalProps, 'children'> {
  title: string
  action: string
  onUpdate: SubmitHandler<DryerFormType>
  methods: UseFormReturn<DryerFormType>
  isLoading: boolean
}

export const UpdateDryerModal: FC<UpdateDryerModalProps> = props => {
  const { title, action, onUpdate, methods, isLoading, ...modalProps } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  return (
    <Modal {...modalProps} aria-labelledby='create-user-modal-title'>
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
          label='Название'
          variant='outlined'
          size='small'
        />
        {errors.name?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Название сушилки обязательно
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
