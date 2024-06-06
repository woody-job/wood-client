import { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { ModalProps } from '@mui/material'
import { Box, Button, Divider, Modal, TextField, Typography } from '@mui/material'

import { DeleteAllFormType } from '@/features/all-data/delete'
import { ModalContent } from '@/shared/ui'
import { ModalCloseButton } from '@/shared/ui/modal'

export type DeleteDataFinalModalProps = Omit<ModalProps, 'onClose' | 'children' | 'onSubmit'> & {
  onClose: () => void
  methods: UseFormReturn<DeleteAllFormType>
  onSubmit: SubmitHandler<DeleteAllFormType>
}

export const DeleteDataFinalModal: FC<DeleteDataFinalModalProps> = props => {
  const { onClose, methods, onSubmit, ...restProps } = props

  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = methods

  const rightConfirmMessage = 'удалитьнельзяпомиловать'

  return (
    <Modal onClose={onClose} {...restProps}>
      <ModalContent sx={{ width: 500 }} component='form' onSubmit={handleSubmit(onSubmit)}>
        <ModalCloseButton onClick={onClose} />
        <Typography variant='h6'>Удаление</Typography>
        <Divider sx={{ my: 1 }} />

        <Typography sx={{ mb: 2 }}>
          Для удаления введите следующий текст: <strong>удалитьнельзяпомиловать</strong>
        </Typography>

        <TextField
          inputProps={{
            ...register('confirmMessage', {
              validate: value => {
                return value === rightConfirmMessage
              },
            }),
          }}
        />

        <Divider sx={{ my: 2 }} />
        <Box display='flex' justifyContent='end' gap={1}>
          <Button variant='gray' onClick={onClose}>
            Отмена
          </Button>
          <Button disabled={!isValid} onClick={onClose}>
            Удалить
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  )
}
