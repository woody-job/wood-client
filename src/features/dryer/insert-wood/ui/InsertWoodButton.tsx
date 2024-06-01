import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { skipToken } from '@reduxjs/toolkit/query'

import { Button, ButtonProps } from '@mui/material'

import { InsertWoodModal } from '@/features/dryer/insert-wood'
import { useFetchDimensionsByWoodClassQuery } from '@/entities/dimension'
import { DryerBringInFormType, useBringInMutation } from '@/entities/dryer'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'

import { useSnackbar } from 'notistack'

export type InsertWoodButtonProps = ButtonProps & {
  dryerId: number
}

export const InsertWoodButton: FC<InsertWoodButtonProps> = props => {
  const { dryerId, ...buttonProps } = props
  const [isOpenInsert, setIsOpenInsert] = useState(false)

  const methods = useForm<DryerBringInFormType>()
  const { watch, reset } = methods

  const { enqueueSnackbar } = useSnackbar()

  const watchWoodClassId = watch('woodClassId')

  const [bringInMutation, { isLoading: isLoadingBringInMutation }] = useBringInMutation()
  const { data: woodClasses, isLoading: isWoodClassesLoading } = useFetchAllWoodClassesQuery(
    undefined,
    { skip: !isOpenInsert }
  )

  const { data: dimensions, isLoading: isDimensionsLoading } = useFetchDimensionsByWoodClassQuery(
    watchWoodClassId ?? skipToken,
    { skip: !isOpenInsert }
  )

  const { data: woodTypes, isLoading: isWoodTypesLoading } = useFetchAllWoodTypesQuery(undefined, {
    skip: !isOpenInsert,
  })

  useEffect(() => {
    if (!isOpenInsert) reset()
  }, [isOpenInsert, reset])

  const handleCloseInsert = () => setIsOpenInsert(false)

  const handleSubmitInsert: SubmitHandler<DryerBringInFormType> = values => {
    bringInMutation({
      ...values,
      dryerChamberId: dryerId,
      date: new Date().toISOString(),
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Доски успешно внесены', { variant: 'success' })
        handleCloseInsert()
      })
      .catch((error: CommonErrorType) => {
        defaultErrorHandler(error, message => enqueueSnackbar(message, { variant: 'error' }))
      })
  }

  const handleOpenInsert = () => setIsOpenInsert(true)

  return (
    <>
      <Button variant='outlined' onClick={handleOpenInsert} {...buttonProps} />

      <InsertWoodModal
        open={isOpenInsert}
        onClose={handleCloseInsert}
        onSubmitForm={handleSubmitInsert}
        methods={methods}
        woodClasses={woodClasses}
        isWoodClassesLoading={isWoodClassesLoading}
        dimensions={dimensions}
        isDimensionsLoading={isDimensionsLoading}
        woodTypes={woodTypes}
        isWoodTypesLoading={isWoodTypesLoading}
        isLoading={isLoadingBringInMutation}
      />
    </>
  )
}
