import { forwardRef, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ButtonProps, IconButton } from '@mui/material'

import { DimensionsTableRow } from '@/widgets/dimensionsSettingsTable/types'
import {
  DimensionFormType,
  UpdateDimensionModal,
  UpdateDimensionParams,
  useUpdateDimensionMutation,
} from '@/entities/dimension'
import { useFetchAllWoodClassesQuery } from '@/entities/wood-class'
import { EditIcon } from '@/shared/ui'

import { getDefaultValues } from '../libs/helpers'

type UpdateDimensionParamsButtonProps = {
  dimension: DimensionsTableRow
} & ButtonProps

export const UpdateDimensionParamsButton = forwardRef<
  HTMLButtonElement,
  UpdateDimensionParamsButtonProps
>(({ dimension, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false)

  const methods = useForm<DimensionFormType>({
    defaultValues: dimension ? getDefaultValues(dimension) : {},
  })
  const { reset } = methods

  const [updateDimensionMutation] = useUpdateDimensionMutation()

  const { data: woodClasses, isLoading: isWoodClassesLoading } = useFetchAllWoodClassesQuery(
    undefined,
    { skip: !isOpen }
  )

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

    const body: UpdateDimensionParams = {
      dimensionId: dimension.id,
      dimensionData: {
        width: Number(width),
        thickness: Number(thickness),
        length: Number(length),
        woodClassId,
      },
    }

    updateDimensionMutation(body)
      .unwrap()
      .then(() => {
        console.log('Уведомление об успешном создании')

        handleClose()
      })
      .catch(error => {
        console.log('Уведомление об ошибке', error)
      })
  }
  return (
    <>
      <IconButton ref={ref} onClick={handleOpen} {...props}>
        <EditIcon />
      </IconButton>

      <UpdateDimensionModal
        methods={methods}
        title={'Редактировать сечение'}
        woodClassesOptions={woodClassesOptions}
        isWoodClassesLoading={isWoodClassesLoading}
        action={'Редактировать'}
        onUpdate={handleSave}
        open={isOpen}
        onClose={handleClose}
      />
    </>
  )
})
