import { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Modal, ModalProps, TextField, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

import { SupplierFormType } from '../model'

export interface UpdateSupplierModalProps extends Omit<ModalProps, 'children'> {
  onUpdate: SubmitHandler<SupplierFormType>
  action: string
  title: string
  methods: UseFormReturn<SupplierFormType>
  isLoading: boolean
}

export const UpdateSupplierModal: FC<UpdateSupplierModalProps> = props => {
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
          inputProps={{ ...register('name', { required: true }) }}
          id='name'
          label='Наименование'
          variant='outlined'
          size='small'
        />
        {errors.name?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Наименование поставщика обязательно
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
