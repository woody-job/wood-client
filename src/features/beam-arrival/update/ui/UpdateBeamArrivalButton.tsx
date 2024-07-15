import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IconButton } from '@mui/material'

import {
  UpdateBeamArrivalFormType,
  UpdateBeamsDataModal,
  useUpdateBeamArrivalMutation,
} from '@/entities/beam-arrival'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { EditIcon } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export type UpdateArrivalButtonProps = {
  onClick: () => void
  isOpen: boolean
  onClose: () => void
  beamArrivalId: number
  amount?: number
  volume?: number
}

export const UpdateBeamArrivalButton: FC<UpdateArrivalButtonProps> = ({
  onClick,
  isOpen,
  onClose,
  beamArrivalId,
  amount,
  volume,
}) => {
  const [updateBeamArrivalMutation, { isLoading: isLoadingUpdateArrivalMutation }] =
    useUpdateBeamArrivalMutation()

  const methods = useForm<UpdateBeamArrivalFormType>({
    defaultValues: { amount, volume },
  })

  const { enqueueSnackbar } = useSnackbar()

  const handleUpdate: SubmitHandler<UpdateBeamArrivalFormType> = ({ amount, volume }) => {
    updateBeamArrivalMutation({
      ...(volume && !amount ? { volume: Number(volume) } : {}),
      ...(amount ? { amount: Number(amount) } : {}),
      beamArrivalId,
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
        isLoading={isLoadingUpdateArrivalMutation}
      />
    </>
  )
}
