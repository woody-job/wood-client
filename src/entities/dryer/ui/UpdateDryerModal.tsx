import { FC } from 'react'

import { Button, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { DryerFormType } from '@/entities/dryer'

export interface UpdateDryerModalProps extends Omit<ModalProps, 'children'> {
  title: string
  action: string
  onUpdate: SubmitHandler<DryerFormType>
  methods: UseFormReturn<DryerFormType>
}

export const UpdateDryerModal: FC<UpdateDryerModalProps> = (props) => {
  const {
    title,
    action,
    onUpdate,
    methods,
    ...modalProps
  } = props
  const { register, handleSubmit, formState: { errors } } = methods

  return (
    <Modal {...modalProps} aria-labelledby="create-user-modal-title">
      <ModalContent
        component="form"
        display="flex"
        flexDirection="column"
        onSubmit={handleSubmit(onUpdate)}
        gap={3}
      >
        <Typography id="create-user-modal-title" textAlign="center" sx={{ mb: 2 }}>
          {title}
        </Typography>

        <TextField
          inputProps={{ ...register('name', { required: true }) }} label="Название" variant="outlined"
          size="small"
        />
        {errors.name?.type === 'required' && (
          <Typography variant="caption" sx={{ color: theme => theme.palette.error.main }}>
            Название сушилки обязательно
          </Typography>
        )}

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {action}
        </Button>
      </ModalContent>
    </Modal>
  )
}
