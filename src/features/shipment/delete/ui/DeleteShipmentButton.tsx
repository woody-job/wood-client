import { FC } from 'react'

import { useDeleteWoodShipmentMutation } from '@/entities/wood-shipment'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { ButtonWithConfirm } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export type DeleteShipmentButtonProps = {
  id: number
  onClose: () => void
}

export const DeleteShipmentButton: FC<DeleteShipmentButtonProps> = ({ id, onClose }) => {
  const [deleteWoodShipmentMutation, { isLoading: isLoadingDeleteWoodShipmentMutation }] =
    useDeleteWoodShipmentMutation()

  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteShipment = (id: number) => {
    deleteWoodShipmentMutation(id)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Отгрузка успешно удалена', { variant: 'info' })
        onClose()
      })
      .catch(error => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <ButtonWithConfirm
      header={'Удаление отгрузки доски'}
      description={'Вы точно хотите удалить?'}
      onConfirm={() => handleDeleteShipment(id as number)}
      isLoading={isLoadingDeleteWoodShipmentMutation}
    />
  )
}
