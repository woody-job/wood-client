import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ButtonProps, IconButton } from '@mui/material'

import {
  UpdateWoodNamingModal,
  useUpdateWoodNamingMutation,
  WoodNaming,
  WoodNamingFormType,
} from '@/entities/wood-naming'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { EditIcon } from '@/shared/ui'

import { useSnackbar } from 'notistack'

export interface UpdateWoodNamingButtonProps extends ButtonProps {
  woodNaming: Omit<WoodNaming, 'woodType'> & { woodTypeId: number }
}

export const UpdateWoodNamingButton: FC<UpdateWoodNamingButtonProps> = props => {
  const {
    woodNaming: { id, name, minDiameter, maxDiameter, length, woodTypeId },
    ...buttonProps
  } = props

  const [isOpenModal, setIsOpenModal] = useState(false)

  const [updateWoodNamingMutation, { isLoading: isLoadingUpdateWoodNamingMutation }] =
    useUpdateWoodNamingMutation()

  const { data: woodTypes, isLoading: isWoodTypesLoading } = useFetchAllWoodTypesQuery()

  const methods = useForm<WoodNamingFormType>({
    defaultValues: {
      name,
      ...(minDiameter ? { minDiameter: Number(minDiameter) } : {}),
      ...(maxDiameter ? { maxDiameter: Number(maxDiameter) } : {}),
      length: Number(length),
      woodTypeId,
    },
  })
  const { enqueueSnackbar } = useSnackbar()

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleUpdateWoodName: SubmitHandler<WoodNamingFormType> = values => {
    const { name, minDiameter, maxDiameter, length, woodTypeId } = values

    updateWoodNamingMutation({
      id,
      name,
      ...(minDiameter ? { minDiameter: Number(minDiameter) } : {}),
      ...(maxDiameter ? { maxDiameter: Number(maxDiameter) } : {}),
      length: Number(length),
      woodTypeId,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Обозначение успешно обновлено', { variant: 'success' })
        handleCloseModal()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <>
      <IconButton onClick={handleOpenModal} {...buttonProps}>
        <EditIcon />
      </IconButton>

      <UpdateWoodNamingModal
        onUpdate={handleUpdateWoodName}
        methods={methods}
        action={'Редактировать'}
        title={'Редактировать обозначение'}
        open={isOpenModal}
        onClose={handleCloseModal}
        isLoading={isLoadingUpdateWoodNamingMutation}
        woodTypes={woodTypes}
        isWoodTypesLoading={isWoodTypesLoading}
      />
    </>
  )
}
