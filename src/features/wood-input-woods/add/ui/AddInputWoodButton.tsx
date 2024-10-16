import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useParams } from 'react-router-dom'

import { Box, Button, ButtonProps } from '@mui/material'

import {
  useCreateBeamInForWorkshopMutation,
  useFetchBeamSizesByLengthQuery,
} from '@/entities/beam-in/api'
import { BeamInFormType, CreateBeamInForWorkshopParams } from '@/entities/beam-in/model'
import { UpdateInputWoodModal } from '@/entities/wood'
import { useFetchAllWoodNamingsQuery } from '@/entities/wood-naming'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

import { useSnackbar } from 'notistack'

type AddInputWoodButtonProps = {
  now: string
  selectedWoodNamingId: number | null
} & ButtonProps

export const AddInputWoodButton: FC<AddInputWoodButtonProps> = ({
  now,
  selectedWoodNamingId,
  ...props
}) => {
  const { workshopId } = useParams()

  const [isOpen, setIsOpen] = useState(false)

  const methods = useForm<BeamInFormType>()
  const { reset, control } = methods

  const [createBeamInMutation, { isLoading: isLoadingCreateBeamInMutation }] =
    useCreateBeamInForWorkshopMutation()

  const { data: beamSizes, isLoading: isLoadingBeamSizes } = useFetchBeamSizesByLengthQuery({
    length: 6,
  })
  const { data: woodNamings, isLoading: isLoadingWoodNamings } = useFetchAllWoodNamingsQuery()

  const { enqueueSnackbar } = useSnackbar()

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    reset()
  }

  const handleSave: SubmitHandler<BeamInFormType> = data => {
    const { beamSizeId, amount, woodNamingId } = data

    if (!workshopId) {
      return
    }

    if (!beamSizeId) {
      return
    }

    if (!woodNamingId) {
      return
    }

    const body: CreateBeamInForWorkshopParams = {
      workshopId: Number(workshopId),
      beamSizeId,
      woodNamingId,
      amount: Number(amount),
      date: now,
    }

    createBeamInMutation(body)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Запись входа успешно создана', { variant: 'success' })
        handleClose()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <Box display='flex' justifyContent='flex-end' width='100%'>
      <Box>
        <Button size='small' onClick={handleOpen} {...props} />
      </Box>

      <UpdateInputWoodModal
        title={'Добавить доски на вход'}
        action={'Добавить'}
        methods={methods}
        beamSizes={beamSizes}
        woodNamings={woodNamings}
        onUpdate={handleSave}
        open={isOpen}
        onClose={handleClose}
        isLoadingBeamSizes={isLoadingBeamSizes}
        isLoadingWoodNamings={isLoadingWoodNamings}
        isLoading={isLoadingCreateBeamInMutation}
        selectedWoodNamingId={selectedWoodNamingId}
        control={control}
      />
    </Box>
  )
}
