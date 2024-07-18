import { FC } from 'react'

import { useDeleteBeamArrivalMutation } from '@/entities/beam-arrival'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { ButtonWithConfirm } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export type DeleteArrivalButtonProps = {
  id: number
  onClose: () => void
}

export const DeleteBeamArrivalButton: FC<DeleteArrivalButtonProps> = ({ id, onClose }) => {
  const [deleteBeamArrivalMutation, { isLoading: isLoadingDeleteBeamArrivalMutation }] =
    useDeleteBeamArrivalMutation()

  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteArrival = (id: number) => {
    deleteBeamArrivalMutation(id)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Поступление успешно удалено', { variant: 'info' })
        onClose()
      })
      .catch(error => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <ButtonWithConfirm
      header={'Удаление поступления сырья'}
      description={'Вы точно хотите удалить?'}
      onConfirm={() => handleDeleteArrival(id as number)}
      isLoading={isLoadingDeleteBeamArrivalMutation}
    />
  )
}
