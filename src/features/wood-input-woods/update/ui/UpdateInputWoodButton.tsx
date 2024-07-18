import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useParams } from 'react-router-dom'

import { ButtonProps, IconButton } from '@mui/material'

import { WorkshopBeamInTableRow } from '@/widgets/workshopInputWoods/types/types'
import {
  useCreateBeamInForWorkshopMutation,
  useFetchBeamSizesByLengthQuery,
  useUpdateBeamInForWorkshopMutation,
} from '@/entities/beam-in/api'
import {
  BeamInFormType,
  CreateBeamInForWorkshopParams,
  UpdateBeamInForWorkshopParams,
} from '@/entities/beam-in/model'
import { UpdateInputWoodModal } from '@/entities/wood'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { EditIcon } from '@/shared/ui'

import { getDefaultValues } from '../lib/helpers'
import { useSnackbar } from 'notistack'

type UpdateInputWoodButtonProps = {
  beamIn: WorkshopBeamInTableRow
  selectedWoodNamingId: number | null
  now: string
} & ButtonProps

export const UpdateInputWoodButton: FC<UpdateInputWoodButtonProps> = ({
  beamIn,
  selectedWoodNamingId,
  now,
  ...props
}) => {
  const { workshopId } = useParams()

  const [isOpen, setIsOpen] = useState(false)

  const methods = useForm<BeamInFormType>({ defaultValues: getDefaultValues(beamIn) })

  const [createBeamInMutation, { isLoading: isLoadingCreateBeamInMutation }] =
    useCreateBeamInForWorkshopMutation()
  const [updateBeamInMutation, { isLoading: isLoadingUpdateBeamInMutation }] =
    useUpdateBeamInForWorkshopMutation()

  const { data: beamSizes, isLoading: isLoadingBeamSizes } = useFetchBeamSizesByLengthQuery({
    length: 6,
  })

  const { enqueueSnackbar } = useSnackbar()

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

    if (!selectedWoodNamingId) {
      return
    }

    // Логика добавлена в связи с появлением дефолтных строк в таблице с пустым amount
    const isCreate = beamIn.isEmptyDefault

    if (isCreate) {
      const body: CreateBeamInForWorkshopParams = {
        workshopId: Number(workshopId),
        beamSizeId,
        amount: Number(amount),
        woodNamingId: selectedWoodNamingId,
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

      return
    }

    const body: UpdateBeamInForWorkshopParams = {
      beamInId: beamIn.beamInId as number,
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
      <span title='Для быстрого редактирования выберете условное обозначение дня'>
        <IconButton disabled={!selectedWoodNamingId} onClick={handleOpen} {...props}>
          <EditIcon />
        </IconButton>
      </span>

      <UpdateInputWoodModal
        title={'Изменить доску на вход'}
        action={'Изменить'}
        methods={methods}
        beamSizes={beamSizes}
        onUpdate={handleSave}
        open={isOpen}
        onClose={handleClose}
        isLoadingBeamSizes={isLoadingBeamSizes}
        woodNamings={undefined}
        selectedWoodNamingId={null}
        isLoadingWoodNamings={false}
        isLoading={isLoadingUpdateBeamInMutation || isLoadingCreateBeamInMutation}
      />
    </>
  )
}
