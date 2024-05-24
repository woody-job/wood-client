import { FC, useMemo, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateInputWoodModal } from '@/entities/wood'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BeamInFormType, CreateBeamInForWorkshopParams } from '@/entities/beam-in/model'
import {
  useCreateBeamInForWorkshopMutation,
  useFetchAllBeamSizesQuery,
} from '@/entities/beam-in/api'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'

import moment from 'moment'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

export const AddInputWoodButton: FC<ButtonProps> = props => {
  const { workshopId } = useParams()

  const [isOpen, setIsOpen] = useState(false)

  const methods = useForm<BeamInFormType>()
  const { reset } = methods

  const [createBeamInMutation] = useCreateBeamInForWorkshopMutation()

  const { data: beamSizes, isLoading: isLoadingBeamSizes } = useFetchAllBeamSizesQuery()

  const { enqueueSnackbar } = useSnackbar()

  const beamSizesOptions = useMemo(() => {
    return beamSizes?.map(beamSize => ({
      id: beamSize.id,
      name: beamSize.diameter,
    }))
  }, [beamSizes])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    reset()
  }

  const handleSave: SubmitHandler<BeamInFormType> = data => {
    const { diameter, amount } = data

    if (!workshopId) {
      return
    }

    const beamSizeId = beamSizes?.find(beamSizeObj => beamSizeObj.diameter === diameter)?.id

    if (!beamSizeId) {
      return
    }

    const body: CreateBeamInForWorkshopParams = {
      workshopId: Number(workshopId),
      beamSizeId,
      amount: Number(amount),
      date: moment().toISOString(),
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
    <>
      <Button size='small' onClick={handleOpen} {...props} />

      <UpdateInputWoodModal
        title={'Добавить доски на вход'}
        action={'Добавить'}
        methods={methods}
        beamSizesOptions={beamSizesOptions}
        onUpdate={handleSave}
        open={isOpen}
        onClose={handleClose}
        isLoadingBeamSizes={isLoadingBeamSizes}
      />
    </>
  )
}
