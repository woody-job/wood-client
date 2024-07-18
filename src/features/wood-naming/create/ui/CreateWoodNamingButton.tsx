import { forwardRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ButtonProps } from '@mui/material'

import {
  UpdateWoodNamingModal,
  useCreateWoodNamingMutation,
  WoodNamingFormType,
} from '@/entities/wood-naming'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

import { useSnackbar } from 'notistack'

export const CreateWoodNamingButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [createWoodNamingMutation, { isLoading: isLoadingCreateWoodNamingMutation }] =
    useCreateWoodNamingMutation()

  const { data: woodTypes, isLoading: isWoodTypesLoading } = useFetchAllWoodTypesQuery()

  const { enqueueSnackbar } = useSnackbar()

  const methods = useForm<WoodNamingFormType>()
  const { reset } = methods

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateWoodNaming: SubmitHandler<WoodNamingFormType> = values => {
    const { name, minDiameter, maxDiameter, length, woodTypeId } = values

    createWoodNamingMutation({
      name,
      ...(minDiameter ? { minDiameter: Number(minDiameter) } : {}),
      ...(maxDiameter ? { maxDiameter: Number(maxDiameter) } : {}),
      length: Number(length),
      woodTypeId,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Обозначение успешно создано', { variant: 'success' })
        handleCloseModal()
        reset()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <>
      <Button ref={ref} variant='gray' size='medium' onClick={handleOpenModal} {...props} />

      <UpdateWoodNamingModal
        onUpdate={handleCreateWoodNaming}
        methods={methods}
        action={'Создать'}
        title={'Создать обозначение'}
        open={isOpenModal}
        onClose={handleCloseModal}
        isLoading={isLoadingCreateWoodNamingMutation}
        woodTypes={woodTypes}
        isWoodTypesLoading={isWoodTypesLoading}
      />
    </>
  )
})
