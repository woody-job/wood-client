import { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Button, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'

export interface UpdateWoodsAmountModalProps extends Omit<ModalProps, 'children' | 'onSubmit'> {
  title: string
  actionTitle: string
  onSubmit: SubmitHandler<{ amount: number }>
  methods: UseFormReturn<{ amount: number }>
}

export const UpdateWoodsAmountModal: FC<UpdateWoodsAmountModalProps> = props => {
  const { title, actionTitle, onSubmit, methods, ...modalProps } = props
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods

  return (
    <Modal {...modalProps}>
      <ModalContent
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        display='flex'
        flexDirection='column'
        gap={1}
      >
        <Typography variant='h5' component='h2' sx={{ mb: 3 }}>
          {title}
        </Typography>
        <TextField
          label='Количество'
          inputProps={{ ...register('amount', { valueAsNumber: true, required: true }) }}
          type='number'
        />
        {errors.amount?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Количество обязательно
          </Typography>
        )}
        <Button type='submit' sx={{ mt: 2 }}>
          {actionTitle}
        </Button>
      </ModalContent>
    </Modal>
  )
}
