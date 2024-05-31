import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { skipToken } from '@reduxjs/toolkit/query'

import { ButtonProps, IconButton } from '@mui/material'

import { WorkshopOutTableRow } from '@/widgets/workshopOutputWoods/types'
import { useFetchDimensionsByWoodClassQuery } from '@/entities/dimension'
import { UpdateOutputWoodModal } from '@/entities/wood'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { useFetchAllWoodTypesQuery } from '@/entities/wood-type'
import { useUpdateWorkshopOutMutation } from '@/entities/workshop-out/api'
import { WorkshopOutFormType } from '@/entities/workshop-out/model'
import { defaultErrorHandler } from '@/shared/libs/helpers'
import { CommonErrorType } from '@/shared/types'
import { EditIcon } from '@/shared/ui'

import { getDefaultValues } from '../lib/helpers'
import { useSnackbar } from 'notistack'

export type UpdateOutputWoodButtonProps = {
  workshopOut: WorkshopOutTableRow
} & ButtonProps

export const UpdateOutputWoodButton: FC<UpdateOutputWoodButtonProps> = ({
  workshopOut,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const methods = useForm<WorkshopOutFormType>({ defaultValues: getDefaultValues(workshopOut) })
  const { watch } = methods

  const { enqueueSnackbar } = useSnackbar()

  const watchWoodClassId = watch('woodClassId')

  const [updateWorkshopOutMutation] = useUpdateWorkshopOutMutation()

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
  }

  const handleSubmit: SubmitHandler<WorkshopOutFormType> = data => {
    updateWorkshopOutMutation({
      workshopOutId: workshopOut.id,
      workshopOutData: data,
    })
      .unwrap()
      .then(() => {
        enqueueSnackbar('Выход из цеха успешно обновлен', { variant: 'success' })
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

      <UpdateOutputWoodModal
        title={'Изменить доску на выход'}
        action={'Изменить'}
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
      />
    </>
  )
}
