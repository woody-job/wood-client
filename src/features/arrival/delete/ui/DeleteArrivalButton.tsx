import { FC } from 'react'

import { useDeleteWoodArrivalMutation } from '@/entities/wood-arrival'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { ButtonWithConfirm } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export type DeleteArrivalButtonProps = {
  id: number
  onClose: () => void
}

export const DeleteArrivalButton: FC<DeleteArrivalButtonProps> = ({ id, onClose }) => {
  const [deleteWoodArrivalMutation, { isLoading: isLoadingDeleteWoodArrivalMutation }] =
    useDeleteWoodArrivalMutation()

  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteShipment = (id: number) => {
    deleteWoodArrivalMutation(id)
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
      isLoading={isLoadingDeleteWoodArrivalMutation}
      header={'Удаление досок'}
      description={'Вы точно хотите удалить?'}
      onConfirm={() => handleDeleteShipment(id as number)}
    />
  )
}
