import { FC, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useParams } from 'react-router-dom'

import { ButtonProps, IconButton } from '@mui/material'

import { WorkshopBeamInTableRow } from '@/widgets/workshopInputWoods/types/types'
import {
  useFetchAllBeamSizesQuery,
  useUpdateBeamInForWorkshopMutation,
} from '@/entities/beam-in/api'
import { BeamInFormType, UpdateBeamInForWorkshopParams } from '@/entities/beam-in/model'
import { UpdateInputWoodModal } from '@/entities/wood'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { EditIcon } from '@/shared/ui'

import { getDefaultValues } from '../lib/helpers'
import { useSnackbar } from 'notistack'

type UpdateInputWoodButtonProps = {
  beamIn: WorkshopBeamInTableRow
} & ButtonProps

export const UpdateInputWoodButton: FC<UpdateInputWoodButtonProps> = ({ beamIn, ...props }) => {
  const { workshopId } = useParams()

  const [isOpen, setIsOpen] = useState(false)

  const methods = useForm<BeamInFormType>({ defaultValues: getDefaultValues(beamIn) })

  const [updateBeamInMutation] = useUpdateBeamInForWorkshopMutation()

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

    const body: UpdateBeamInForWorkshopParams = {
      beamInId: Number(beamIn.id),
      beamInData: {
        beamSizeId,
        amount: Number(amount),
      },
    }

    updateBeamInMutation(body)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Запись входа успешно обновлена', { variant: 'success' })
        handleClose()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <>
      <IconButton onClick={handleOpen} {...props}>
        <EditIcon />
      </IconButton>

      <UpdateInputWoodModal
        title={'Изменить доску на вход'}
        action={'Изменить'}
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
