import { forwardRef, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ButtonProps } from '@mui/material'

import {
  CreateDimensionParams,
  DimensionFormType,
  UpdateDimensionModal,
  useCreateDimensionMutation,
} from '@/entities/dimension'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { CommonErrorType } from '@/shared/types'

import { useSnackbar } from 'notistack'

export const CreateDimensionButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)

  const methods = useForm<DimensionFormType>()
  const { reset } = methods

  const [createDimensionMutation] = useCreateDimensionMutation()

  const { data: woodClasses, isLoading: isWoodClassesLoading } = useFetchAllWoodClassesQuery(
    undefined,
    { skip: !isOpen }
  )

  const { enqueueSnackbar } = useSnackbar()

  const woodClassesOptions = useMemo(() => {
    return woodClasses?.map(woodClass => ({
      id: woodClass.id,
      name: woodClass.name,
    }))
  }, [woodClasses])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    reset()
  }

  const handleSave: SubmitHandler<DimensionFormType> = data => {
    const { width, thickness, length, woodClass } = data

    const woodClassId = woodClasses?.find(woodClassObj => woodClassObj.name === woodClass)?.id ?? -1

    const body: CreateDimensionParams = {
      width: Number(width),
      thickness: Number(thickness),
      length: Number(length),
      woodClassId,
    }

    createDimensionMutation(body)
      .unwrap()
      .then(() => {
        enqueueSnackbar('Сечение успешно создано', { variant: 'success' })
        handleClose()
      })
      .catch((error: CommonErrorType) => {
        enqueueSnackbar(error.data.message, { variant: 'error' })
      })
  }
  return (
    <>
      <Button variant='gray' ref={ref} onClick={handleOpen} {...props} />

      <UpdateDimensionModal
        methods={methods}
        title={'Создать сечение'}
        woodClassesOptions={woodClassesOptions}
        isWoodClassesLoading={isWoodClassesLoading}
        action={'Создать'}
        onUpdate={handleSave}
        open={isOpen}
        onClose={handleClose}
      />
    </>
  )
})
