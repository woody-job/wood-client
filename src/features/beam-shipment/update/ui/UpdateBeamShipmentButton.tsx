import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IconButton } from '@mui/material'

import {
  UpdateBeamsDataModal,
  UpdateBeamShipmentFormType,
  useUpdateBeamShipmentMutation,
} from '@/entities/beam-shipment'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { EditIcon } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export type UpdateShipmentButtonProps = {
  onClick: () => void
  isOpen: boolean
  onClose: () => void
  beamShipmentId: number
  amount?: number
  volume?: number
}

export const UpdateBeamShipmentButton: FC<UpdateShipmentButtonProps> = ({
  onClick,
  isOpen,
  onClose,
  beamShipmentId,
  amount,
  volume,
}) => {
  const [updateBeamShipmentMutation, { isLoading: isLoadingUpdateShipmentMutation }] =
    useUpdateBeamShipmentMutation()

  const methods = useForm<UpdateBeamShipmentFormType>({
    defaultValues: { amount, volume },
  })

  const { enqueueSnackbar } = useSnackbar()

  const handleUpdate: SubmitHandler<UpdateBeamShipmentFormType> = ({ amount, volume }) => {
    updateBeamShipmentMutation({
      ...(volume && !amount ? { volume: Number(volume) } : {}),
      ...(amount ? { amount: Number(amount) } : {}),
      beamShipmentId,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Данные успешно обновлены', { variant: 'success' })
        onClose()
      })
      .catch(error => {
        defaultErrorHandler(error, message =>
          enqueueSnackbar(message, {
            variant: 'error',
          })
        )
      })
  }

  return (
    <>
      <IconButton onClick={onClick}>
        <EditIcon />
      </IconButton>

      <UpdateBeamsDataModal
        title={'Редактировать'}
        actionTitle={'Редактировать'}
        onSubmit={handleUpdate}
        open={isOpen}
        onClose={onClose}
        methods={methods}
        isLoading={isLoadingUpdateShipmentMutation}
      />
    </>
  )
}
