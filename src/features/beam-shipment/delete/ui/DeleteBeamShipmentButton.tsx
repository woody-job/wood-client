import { FC } from 'react'

import { useDeleteBeamShipmentMutation } from '@/entities/beam-shipment'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { ButtonWithConfirm } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export type DeleteShipmentButtonProps = {
  id: number
  onClose: () => void
}

export const DeleteBeamShipmentButton: FC<DeleteShipmentButtonProps> = ({ id, onClose }) => {
  const [deleteBeamShipmentMutation, { isLoading: isLoadingDeleteBeamShipmentMutation }] =
    useDeleteBeamShipmentMutation()

  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteShipment = (id: number) => {
    deleteBeamShipmentMutation(id)
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
      header={'Удаление отгрузки сырья'}
      description={'Вы точно хотите удалить?'}
      onConfirm={() => handleDeleteShipment(id as number)}
      isLoading={isLoadingDeleteBeamShipmentMutation}
    />
  )
}
