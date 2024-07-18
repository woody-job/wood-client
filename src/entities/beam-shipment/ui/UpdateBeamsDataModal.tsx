import { FC, useState } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Modal, ModalProps, TextField, Typography } from '@mui/material'

import { UpdateBeamShipmentFormType } from '@/entities/beam-shipment'
import { ModalContent } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

export interface UpdateBeamsDataModalProps extends Omit<ModalProps, 'children' | 'onSubmit'> {
  title: string
  actionTitle: string
  onSubmit: SubmitHandler<UpdateBeamShipmentFormType>
  methods: UseFormReturn<UpdateBeamShipmentFormType>
  isLoading: boolean
}

export const UpdateBeamsDataModal: FC<UpdateBeamsDataModalProps> = props => {
  const { title, actionTitle, onSubmit, methods, isLoading, ...modalProps } = props
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods

  const [isAmountMode] = useState(Boolean(watch('amount')))

  const amountInput = (
    <>
      <TextField
        label='Количество'
        inputProps={{ ...register('amount', { valueAsNumber: true, required: isAmountMode }) }}
        type='number'
      />
      {errors.amount?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Количество обязательно
        </Typography>
      )}
    </>
  )

  const volumeInput = (
    <>
      <TextField
        label='Объем, м3'
        inputProps={{
          step: 'any',
          ...register('volume', { valueAsNumber: true, required: !isAmountMode }),
        }}
        type='number'
      />
      {errors.volume?.type === 'required' && (
        <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
          Объем обязателен
        </Typography>
      )}
    </>
  )

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
        {isAmountMode ? amountInput : volumeInput}
        <ButtonWithLoader isLoading={isLoading} type='submit' sx={{ mt: 2 }}>
          {actionTitle}
        </ButtonWithLoader>
      </ModalContent>
    </Modal>
  )
}
