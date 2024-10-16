import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useParams } from 'react-router-dom'

import { skipToken } from '@reduxjs/toolkit/query'

import { Button, ButtonProps } from '@mui/material'

import { useFetchDimensionsByWoodClassQuery } from '@/entities/dimension'
import { UpdateOutputWoodModal } from '@/entities/wood'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { useCreateWorkshopOutMutation } from '@/entities/workshop-out/api'
import { WorkshopOutFormType } from '@/entities/workshop-out/model'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

import { useSnackbar } from 'notistack'

type AddOutputWoodButtonProps = {
  now: string
} & ButtonProps

export const AddOutputWoodButton: FC<AddOutputWoodButtonProps> = ({ now, ...props }) => {
  const { workshopId } = useParams()

  const [isOpen, setIsOpen] = useState(false)

  const methods = useForm<WorkshopOutFormType>()
  const { watch, reset, control } = methods

  const { enqueueSnackbar } = useSnackbar()

  const watchWoodClassId = watch('woodClassId')

  const [createWorkshopOutMutation, { isLoading: isLoadingCreateWorkshopOutMutation }] =
    useCreateWorkshopOutMutation()

  const { data: woodClasses, isLoading: isWoodClassesLoading } = useFetchAllWoodClassesQuery(
    undefined,
    { skip: !isOpen }
  )

  const { data: dimensions, isLoading: isDimensionsLoading } = useFetchDimensionsByWoodClassQuery(
    watchWoodClassId ?? skipToken,
    { skip: !isOpen }
  )

  const { data: woodTypes, isLoading: isWoodTypesLoading } = useFetchAllWoodTypesQuery(undefined, {
    skip: !isOpen,
  })

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
    reset()
  }

  const handleSubmit: SubmitHandler<WorkshopOutFormType> = data => {
    createWorkshopOutMutation({
      ...data,
      workshopId: Number(workshopId),
      date: now,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Выход из цеха успешно добавлен', { variant: 'success' })
        handleClose()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  return (
    <>
      <Button size='small' onClick={handleOpen} {...props} />

      <UpdateOutputWoodModal
        title={'Добавить доски на выход'}
        action={'Добавить'}
        onUpdate={handleSubmit}
        open={isOpen}
        onClose={handleClose}
        woodClasses={woodClasses}
        isWoodClassesLoading={isWoodClassesLoading}
        dimensions={dimensions}
        isDimensionsLoading={isDimensionsLoading}
        woodTypes={woodTypes}
        isWoodTypesLoading={isWoodTypesLoading}
        methods={methods}
        isLoading={isLoadingCreateWorkshopOutMutation}
        control={control}
      />
    </>
  )
}
