import { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Modal, ModalProps, TextField, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

import { PersonInChargeFormType } from '../model'

export interface UpdatePersonInChargeModalProps extends Omit<ModalProps, 'children'> {
  onUpdate: SubmitHandler<PersonInChargeFormType>
  action: string
  title: string
  methods: UseFormReturn<PersonInChargeFormType>
  isLoading: boolean
}

export const UpdatePersonInChargeModal: FC<UpdatePersonInChargeModalProps> = props => {
  const { onUpdate, action, title, methods, isLoading, ...modalProps } = props

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods

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
          inputProps={{ ...register('initials', { required: true }) }}
          id='initials'
          label='Ининциалы'
          variant='outlined'
          size='small'
        />
        {errors.initials?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Инициалы ответственного обязательны
          </Typography>
        )}

        <TextField
          inputProps={{ ...register('secondName', { required: true }) }}
          id='secondName'
          label='Фамилия'
          variant='outlined'
          size='small'
        />
        {errors.secondName?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Фамилия ответственного обязательна
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
