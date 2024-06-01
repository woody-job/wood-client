import { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Modal, ModalProps, TextField, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

export interface UpdateWoodsAmountModalProps extends Omit<ModalProps, 'children' | 'onSubmit'> {
  title: string
  actionTitle: string
  onSubmit: SubmitHandler<{ amount: number }>
  methods: UseFormReturn<{ amount: number }>
  isLoading: boolean
}

export const UpdateWoodsAmountModal: FC<UpdateWoodsAmountModalProps> = props => {
  const { title, actionTitle, onSubmit, methods, isLoading, ...modalProps } = props
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
        <ButtonWithLoader isLoading={isLoading} type='submit' sx={{ mt: 2 }}>
          {actionTitle}
        </ButtonWithLoader>
      </ModalContent>
    </Modal>
  )
}
