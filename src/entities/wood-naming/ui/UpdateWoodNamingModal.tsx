import { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Button, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { WoodNamingFormType } from '@/entities/wood-naming'
import { ModalContent } from '@/shared/ui'

export interface UpdateWoodNamingModalProps extends Omit<ModalProps, 'children'> {
  onUpdate: SubmitHandler<WoodNamingFormType>
  action: string
  title: string
  methods: UseFormReturn<WoodNamingFormType>
}

export const UpdateWoodNamingModal: FC<UpdateWoodNamingModalProps> = props => {
  const { onUpdate, action, title, methods, ...modalProps } = props

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
          label='Название'
          variant='outlined'
          size='small'
        />
        {errors.name?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Название обозначения обязательно
          </Typography>
        )}

        <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
          {action}
        </Button>
      </ModalContent>
    </Modal>
  )
}
